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

async function insertDatasToDevice({name_device, name_room, ts, activity, co2, humidity, pressure, temperature }) {
    const res = await sql`
        INSERT INTO device (name_device, name_room, ts, activity, co2, humidity, pressure, temperature )
        VALUES (${ name_device }, ${ name_room }, ${ ts }, ${ activity }, ${ co2 }, ${ humidity }, ${ pressure }, ${ temperature } )
        RETURNING name_device, name_room, ts, activity, co2, humidity, pressure, temperature
    `
    return res
}

async function insertDatasToBattery({ name_device, ts, battery }) {
    const res = await sql`
        INSERT INTO battery ( name_device, ts, battery )
        VALUES ( ${ name_device }, ${ ts }, ${ battery } )
        RETURNING name_device, ts, battery
    `
    return res
}

async function getAllData() {
    const res = await sql`
        SELECT * FROM device
    `
    return res
}

async function getDatasFromDevice(name_device) {
    const res = await sql`
        SELECT * FROM device WHERE name_device = ${ name_device }
    `
    return res
}

module.exports = {sql, insertDatasToDevice, insertDatasToBattery, getAllData, getDatasFromDevice}