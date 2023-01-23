// Imports
const postgres = require('postgres') 

// Connection to database
const sql = postgres('postgres://postgres:password@localhost:5432/postgres', {
    host: 'localhost',      // Postgres ip address[s] or domain name[s] // process.env.POSTGRES_HOST
    port: process.env.POSTGRES_PORT,             // Postgres server port[s]
    database: process.env.POSTGRES_DB,  // Name of database to connect to
    username: process.env.POSTGRES_USERNAME,  // Username of database user
    password: process.env.POSTGRES_PASSWORD,   // Password of database user
})

async function insertData({devEUI, ts, activity, co2, humidity, pressure, temperature }) {
    const res = await sql`
<<<<<<< HEAD
        INSERT INTO data (devEUI, ts, activity, co2, humidity, pressure, temperature )
        VALUES (${ devEUI }, ${ ts }, ${ activity }, ${ co2 }, ${ humidity }, ${ pressure }, ${ temperature } )
        RETURNING devEUI, ts, activity, co2, humidity, pressure, temperature
=======
        INSERT INTO project ( name_project )
        VALUES ( ${ name_project } )
        RETURNING name_device
>>>>>>> Fix typo on insertDatasToProject
    `
    return res
}

async function insertBattery({ devEUI, ts, battery }) {
    const res = await sql`
        INSERT INTO battery ( devEUI, ts, battery )
        VALUES ( ${ devEUI }, ${ ts }, ${ battery } )
        RETURNING devEUI, ts, battery
    `
    return res
}

async function getAllData() {
    const res = await sql`
        SELECT * FROM data
    `
    return res
}

async function getDatasFromDevice(devEUI) {
    const res = await sql`
        SELECT * FROM data WHERE devEUI = ${ devEUI }
    `
    return res
}

module.exports = {sql, insertData, insertBattery, getAllData, getDatasFromDevice}
