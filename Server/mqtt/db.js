// Imports
const postgres = require('postgres') 

// Connection to database
const sql = postgres('postgres://postgres:password@postgres:5432/postgres', {
    host: process.env.POSTGRES_HOST,      // Postgres ip address[s] or domain name[s]
    port: process.env.POSTGRES_PORT,             // Postgres server port[s]
    database: process.env.POSTGRES_DB,  // Name of database to connect to
    username: process.env.POSTGRES_USERNAME,  // Username of database user
    password: process.env.POSTGRES_PASSWORD,   // Password of database user
})

async function insertDatasToMqttData({ deviceName, ts, activity, co2, humidity, pressure, temperature }) {
    const res = await sql`
        INSERT INTO mqtt_data ( deviceName, ts, activity, co2, humidity, pressure, temperature )
        VALUES ( ${ deviceName }, ${ ts }, ${ activity }, ${ co2 }, ${ humidity }, ${ pressure }, ${ temperature } )
        RETURNING deviceName, ts, activity, co2, humidity, pressure, temperature
    `
    return res
}

async function insertDatasToRoom({ projet, room, deviceName, ts, battery }) {
    const res = await sql`
        INSERT INTO room ( projet, room, deviceName, ts, battery )
        VALUES ( ${ projet }, ${ room }, ${ deviceName }, ${ ts }, ${ battery } )
        RETURNING projet, room, deviceName, ts, battery
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

module.exports = {sql, insertDatasToMqttData, insertDatasToRoom, getAllData, getDatasFromDevice}