import { sql } from "../config/dbConnection.js"

export type Data = {
    id: number
    deveui: string
    ts: Date
    activity: number
    co2: number
    humidity: number
    pressure: number
    temperature: number
}

export async function getAllData() {
    const result = await sql<Data[]>`
        SELECT * FROM data da, device de, room_project_device rpd
        WHERE da.deveui = de.deveui
        AND de.deveui = rpd.deveui
    `

    return result
}

export async function getDatasFromDevice(name_device: string) {
    const result = await sql<Data[]>`
        SELECT * FROM device de, data da, room_project_device rpd
        WHERE de.deveui = da.deveui 
        AND de.deveui = rpd.deveui
        AND de.name  = ${ name_device }
    `

    return result
}

export async function getDataFromRoomProject(name_project: string, name_room: string) {
    const result = await sql<Data[]>`
        SELECT * FROM data Da, device D, room_project_device RPD
        WHERE RPD.project_name = ${ name_project } 
        AND RPD.room_name = ${ name_room } 
        AND RPD.deveui = D.deveui 
        AND D.deveui = Da.deveui
    `

    return result
}

export async function getDataFromType(type: string) {
    console.log("hello");
    
    console.log(type)

    const result = await sql<Data[]>`
        SELECT da.${ sql(type) }, de.name FROM device de, data da 
        WHERE de.deveui = da.deveui 
    `

    return result
}