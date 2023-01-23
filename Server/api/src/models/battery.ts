import { sql } from '../config/dbConnection.js'

export type Battery = {
    project: string
    room: string
    deviceName: string
    ts: Date
    battery: number
}

export async function getAllBattery() {
    const result = await sql<Battery[]>`
        SELECT * FROM room
    `

    return result
}

export async function getBatteryFromDevice(deviceName: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM room WHERE deviceName = ${ deviceName }
    `

    return result
}