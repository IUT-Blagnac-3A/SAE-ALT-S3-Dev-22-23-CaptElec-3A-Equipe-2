import { sql } from '../config/dbConnection.js'

export type Battery = {
    room_name: string
    project_name: string
    name: string
    ts: Date
    battery: number
}

export async function getAllBattery() {
    const result = await sql<Battery[]>`
        SELECT * FROM battery b, device d, room_project_device rpd
        WHERE b.deveui = d.deveui
        AND d.deveui = rpd.deveui
    `

    return result
}

export async function getBatteryFromDevice(name_device: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM battery b, device d, room_project_device rpd 
        WHERE d.name = ${ name_device }
        AND b.deveui = d.deveui
        AND d.deveui = rpd.deveui
    `

    return result
}