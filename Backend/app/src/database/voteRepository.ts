import { pool } from './connection';

export const createVotePoolDB = async (title: string, description: string, duration: number, contractAddress: string) => {
    const result = await pool.query(
        `INSERT INTO vote_pools
            (title, description, duration_seconds, contract_address)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [title, description, duration, contractAddress],
    );

    return result.rows[0];
}

export const findVotePoolById = async (id: string) => {
    const result = await pool.query('SELECT * FROM vote_pools WHERE id = $1', [id]);
    return result.rows[0];
}
