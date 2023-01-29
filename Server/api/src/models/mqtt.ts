import { sql } from "../config/dbConnection.js"

export type Data = {
    name: string
    host: string
    topic: string
    type: string
}

export async function getMqttFluxFromName(name: string) {
    const result = await sql<Data[]>`
        SELECT * FROM mqtt_flux
        WHERE name = ${ name }
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function getMqttFlux() {
    const result = await sql<Data[]>`
        SELECT * FROM mqtt_flux
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function insertMqttFlux(name : string, host : string, topic : string, type : string ) {
    const result = await sql`
        INSERT INTO mqtt_flux ( name, host, topic, type )
        VALUES ( ${ name }, ${ host }, ${ topic }, ${ type } )
        RETURNING name, host, topic, type
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function deleteMqttFlux(name : string) {
    const result = await sql`
        DELETE FROM mqtt_flux
        WHERE name = ${ name }
        RETURNING name
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}
