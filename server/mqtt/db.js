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
    const res = await sql`
        INSERT INTO mqtt_data ( deviceName, ts, activity, co2, humidity, pressure, temperature )
        VALUES ( ${ deviceName }, ${ ts }, ${ activity }, ${ co2 }, ${ humidity }, ${ pressure }, ${ temperature } )
        RETURNING deviceName, ts, activity, co2, humidity, pressure, temperature
    `
    return res
}

async function getAllData() {
    const res = await sql`
        SELECT * FROM mqtt_data
    `
    return res
}

async function getDatasFromDevice(deviceName) {
    const res = await sql`
        SELECT  * FROM mqtt_data WHERE deviceName = ${ deviceName }
    `
    return res
}

module.exports = {sql, insertDatas, getAllData, getDatasFromDevice}