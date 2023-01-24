import { sql } from '../config/dbConnection.js'

export type Battery = {
    name_device: string
    ts: Date
    battery: number
}

export async function getAllBattery() {
    const result = await sql<Battery[]>`
        SELECT * FROM battery
    `

    return result
}

export async function getBatteryFromDevice(name_device: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM battery WHERE name_device = ${ name_device }
    `

    return result
}