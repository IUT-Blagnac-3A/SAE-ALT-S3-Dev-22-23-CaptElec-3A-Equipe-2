import { sql } from "../config/dbConnection.js"

export type Sensor = {
    deveui: string
    device_name: string
    project_name: string
    room_name: string
}

export async function getAllSensors(project: string) {
    const result = await sql<Sensor[]>`
        SELECT * FROM room_project_device rpd, device de
        WHERE rpd.deveui = de.deveui
        AND rpd.project_name = ${project}
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    });

    return result
}

export async function getSensorRoom(project: string, room: string) {
    const result = await sql<Sensor[]>`
        SELECT * FROM room_project_device rpd, device de
        WHERE rpd.deveui = de.deveui
        AND rpd.project_name = ${project}
        AND rpd.room_name = ${room}
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    });

    return result
}

export async function addSensor(device: string, deveui: string, project: string, room: string) {
    await sql`
        INSERT INTO device (name, deveui)
        VALUES (${device}, ${deveui})
        RETURNING deveui
    `.then(async () => {
        await sql`
            INSERT INTO room_project_device (deveui, project_name, room_name)
            VALUES (${deveui}, ${project}, ${room})
            RETURNING deveui
        `
    }).catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    });
}

export async function deleteSensor(project: string, room: string) {
    await sql`
        SELECT rpd.deveui FROM room_project_device rpd
        WHERE rpd.project_name = ${project}
        AND rpd.room_name = ${room}
    `.then(async (result) => {
        await sql`
            DELETE FROM room_project_device
            WHERE project_name = ${project}
            AND room_name = ${room}
        `.then(async () => {
            await sql`
                DELETE FROM device
                WHERE deveui = ${result[0].deveui}
            `
        })
    }).catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    });
}
