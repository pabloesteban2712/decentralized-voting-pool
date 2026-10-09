import { pool } from '../database/connection';
import { usernameRow, mailRow } from '../entities/types';

export const createUserDB = async (name: string, username: string, mail: string, passwordHash: string, role: number) => {
    const result = await pool.query(
        `INSERT INTO users (name, username, mail, password_hash, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, username, mail`,
        [name, username, mail, passwordHash, role]   
    );

    return result.rows[0];
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
