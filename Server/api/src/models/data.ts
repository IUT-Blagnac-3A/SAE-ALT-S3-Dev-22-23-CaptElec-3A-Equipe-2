import { sql } from "../config/dbConnection.js"

export type Data = {
    deviceName: string
    ts: Date
    activity: number
    co2: number
    humidity: number
    pressure: number
    temperature: number
}

export async function getAllData() {
    const result = await sql<Data[]>`
        SELECT * FROM mqtt_data
    `

    return result
}

export async function getDatasFromDevice(deviceName: string) {
    const result = await sql<Data[]>`
        SELECT * FROM mqtt_data WHERE deviceName = ${ deviceName }
    `

    return result
}