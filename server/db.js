// Imports
const postgres = require('postgres') 

// Connection to database
const sql = postgres('postgres://timescale:password@localhost:5432/timescale', {
    host: 'localhost',      // Postgres ip address[s] or domain name[s]
    port: 5432,             // Postgres server port[s]
    database: 'timescale',  // Name of database to connect to
    username: 'timescale',  // Username of database user
    password: 'password',   // Password of database user
})

async function insertDatas({ deviceName, ts, activity, co2, humidity, pressure, temperature }) {
    const datas = await sql`
        INSERT INTO mqtt_data ( deviceName, ts, activity, co2, humidity, pressure, temperature )
        VALUES ( ${ deviceName }, ${ ts }, ${ activity }, ${ co2 }, ${ humidity }, ${ pressure }, ${ temperature } )
        returning deviceName, ts, activity, co2, humidity, pressure, temperature
    `
    return datas
}

module.exports = {sql, insertDatas}