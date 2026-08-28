import { checkName, checkUsername } from '../utils/utilsUser/name';
import { checkMail } from '../utils/utilsUser/mail';
import { checkPassword, hashPassword } from '../utils/utilsUser/password';
import { checkRole } from '../utils/utilsUser/role';
import { createUserDB } from '../database/userRepository';
import { pool } from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async  (name: string, username: string, mail: string, password: string) => {
    const cleanName = await checkName(name)
    const cleanUsername = await checkUsername(username)
    const cleanMail = await checkMail(mail)
    const cleanPassword = await checkPassword(password)
    const role = await checkRole(mail)

    // If checkPassword is right, we can crypt the password
    const cryptPassword = await hashPassword(cleanPassword)

    await createUserDB(cleanName, cleanUsername, cleanMail, cryptPassword, role)
}

export const logInUser = async (username: string, password: string) => {

    const result = await pool.query('SELECT id, username, password FROM users WHERE username = $1',
        [username])
    
    const user = result.rows[0];

    if (!user) {
        throw new Error("Invalid credentials.")
    }

    const payload = {
        userId: user.id,
        username: user.username
    }
    const hashedPassword = user.password;

    // WE CALL ON THE LOGIN WITH THE NORMAL PASSWORD AND WE COMPARE WITH THE HASHED ONE
    const isValid = await bcrypt.compare(password, hashedPassword);

    if (!isValid) {
        throw new Error('Invalid credentials.')
    }

    const accessToken = jwt.sign( payload, process.env.TOKEN_SECRET!, { expiresIn: '10m' });
    const refreshToken = jwt.sign( payload, process.env.REFRESH_SECRET!, { expiresIn: '10d' });

    return { accessToken, refreshToken }
}

export const refreshAccessToken = async (refreshToken: string) => {

    const decoded = jwt.verify(refreshToken,  process.env.REFRESH_SECRET!) as { username: string };

    const newAccessToken = jwt.sign({ username: decoded.username }, process.env.TOKEN_SECRET!, { expiresIn: '10m' });

    return newAccessToken;

};