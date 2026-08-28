import { pool } from '../database/connection';
import { usernameRow, mailRow } from '../entities/types';

export const createUserDB = async (name: string, username: string, mail: string, passwordHash: string, role: number): Promise<void> => {
    await pool.query(
        `Insert into users (name, username, mail, password, role_id) values ($1, $2, $3, $4, $5)`,
        [name, username, mail, passwordHash, role]   
    );
};

export const findUsernameDB = async (username: string): Promise<usernameRow | null> => {
    const result = await pool.query(
        'SELECT username FROM users WHERE username = $1',
        [username]
    );

    return result.rows[0] ?? null;
};

export const findMailDB = async (mail: string): Promise<mailRow | null> => {
    const result = await pool.query(
        'SELECT mail FROM users WHERE mail = $1',
        [mail]
    );

    return result.rows[0] ?? null;
};