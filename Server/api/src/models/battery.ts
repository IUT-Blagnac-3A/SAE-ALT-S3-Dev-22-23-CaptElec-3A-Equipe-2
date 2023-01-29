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
        AND b.ts > now() - interval '2 hour'
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function getAllBatteryFromProject(project: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM battery b, device d, room_project_device rpd
        WHERE b.deveui = d.deveui
        AND d.deveui = rpd.deveui
        AND b.ts > now() - interval '2 hour'
        AND rpd.project_name = ${ project }
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function getBatteryFromDevice(name_device: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM battery b, device d, room_project_device rpd 
        WHERE d.name = ${ name_device }
        AND b.deveui = d.deveui
        AND d.deveui = rpd.deveui
        AND b.ts > now() - interval '2 hour'
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function getProjectBatteryFromDevice(project: string, name_device: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM battery b, device d, room_project_device rpd 
        WHERE d.name = ${ name_device }
        AND b.deveui = d.deveui
        AND d.deveui = rpd.deveui
        AND b.ts > now() - interval '2 hour'
        AND rpd.project_name = ${ project }
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function getBatteryFromRoomProject(room: string, project: string) {
    const result = await sql<Battery[]>`
        SELECT * FROM battery b, device d, room_project_device rpd 
        WHERE rpd.room_name = ${ room }
        AND rpd.project_name = ${ project }
        AND b.deveui = d.deveui
        AND d.deveui = rpd.deveui
        AND b.ts > now() - interval '2 hour'
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}