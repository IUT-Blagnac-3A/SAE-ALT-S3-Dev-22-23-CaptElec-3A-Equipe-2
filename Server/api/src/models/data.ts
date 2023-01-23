import { sql } from "../config/dbConnection.js"

export type Data = {
    project: string
    room: string
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

export async function getDataFromRoom(project: string, room: string) {
    const result = await sql<Data[]>`
        SELECT * FROM mqtt_data WHERE projet = ${ project } AND room = ${ room }
    `

    return result
}

export async function getDataFromType(type: string) {
    console.log("hello");
    
    console.log(type)

    const result = await sql<Data[]>`
        SELECT ${ sql(type) }, deviceName  FROM mqtt_data
    `

    return result
}