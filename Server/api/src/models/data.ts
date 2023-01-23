import { sql } from "../config/dbConnection.js"

export type Data = {
    name_device: string
    name_room: string
    ts: Date
    activity: number
    co2: number
    humidity: number
    pressure: number
    temperature: number
}

export async function getAllData() {
    const result = await sql<Data[]>`
        SELECT * FROM device
    `

    return result
}

export async function getDatasFromDevice(name_device: string) {
    const result = await sql<Data[]>`
        SELECT * FROM device WHERE name_device = ${ name_device }
    `

    return result
}

export async function getDataFromRoomProject(name_project: string, name_room: string) {
    const result = await sql<Data[]>`
        SELECT * FROM device D, room R, project P 
        WHERE P.name_project = ${ name_project } 
        AND R.name_room = ${ name_room } 
        AND D.name_room = R.name_room 
        AND R.name_project = P.name_project
    `

    return result
}