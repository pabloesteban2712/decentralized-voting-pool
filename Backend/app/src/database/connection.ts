const { Pool } = require('pg')

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'votePool',
    password: '1234',
    port: 5432
})

pool.connect()
  .then((): void => {
    console.log('Connected to PostgreSQL')
  }) 
  .catch((err: Error): void => {
    console.error('Connection error', err)
})