// Imports
const postgres = require('postgres') 

// Connection to database
const sql = postgres('postgres://postgres:password@postgres:5432/postgres', {
    host: process.env.POSTGRES_HOST,      // Postgres ip address[s] or domain name[s] // process.env.POSTGRES_HOST
    port: process.env.POSTGRES_PORT,             // Postgres server port[s]
    database: process.env.POSTGRES_DB,  // Name of database to connect to
    username: process.env.POSTGRES_USERNAME,  // Username of database user
    password: process.env.POSTGRES_PASSWORD,   // Password of database user
})

async function getMqttFlux() {
    try {
        const res = await sql`
        SELECT * FROM mqtt_flux
        `
        return res
    } catch (error) {
        console.log(error)
    }
}

async function insertData({deveui, ts, activity, co2, humidity, pressure, temperature }) {
    try {
        const res = await sql`
        INSERT INTO data (deveui, ts, activity, co2, humidity, pressure, temperature )
        VALUES (${ deveui }, ${ ts }, ${ activity }, ${ co2 }, ${ humidity }, ${ pressure }, ${ temperature } )
        RETURNING deveui, ts, activity, co2, humidity, pressure, temperature
        `
        return res
    } catch (error) {
        console.log(error)
    }
}

async function insertBattery({ deveui, ts, battery }) {
    try {
        const res = await sql`
            INSERT INTO battery ( deveui, ts, battery )
            VALUES ( ${ deveui }, ${ ts }, ${ battery } )
            RETURNING deveui, ts, battery
        `
        return res
    } catch (error) {
        console.log(error)
    }
}

module.exports = {sql, getMqttFlux, insertData, insertBattery}
