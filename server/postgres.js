const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'timescale',
    user: 'timescale',
    password: 'password'
});

pool.on('connect', client => {
    client.query('set search_path to public')
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
}