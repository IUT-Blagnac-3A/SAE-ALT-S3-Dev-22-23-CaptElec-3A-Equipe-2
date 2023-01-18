import postgres from 'postgres';

const sql = postgres('postgres://timescale:password@localhost:5432/timescale', {
    host: 'timescaledb',      // Postgres ip address[s] or domain name[s]
    port: 5432,             // Postgres server port[s]
    database: 'timescale',  // Name of database to connect to
    username: 'timescale',  // Username of database user
    password: 'password',   // Password of database user
})

export async function getAllData() {
    const result = await sql`
        SELECT * FROM mqtt_data
    `

    return result
}

export async function getDatasFromDevice(deviceName: string) {
    const result = await sql`
        SELECT * FROM mqtt_data WHERE deviceName = ${ deviceName }
    `

    return result
}