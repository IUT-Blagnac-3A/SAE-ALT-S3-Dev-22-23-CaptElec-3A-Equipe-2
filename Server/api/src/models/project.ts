import { sql } from "../config/dbConnection.js"

export type Data = {
    id: number
    name: string
}

export async function getAllProject() {
    const result = await sql<Data[]>`
        SELECT * FROM project
    `
    return result
}

export async function insertProject(name : string) {
    const result = await sql`
        INSERT INTO project ( name )
        VALUES ( ${ name })
        RETURNING name
    `
    return result
}

export async function deleteProject(name : string) {
    const result = await sql`
        DELETE FROM project
        WHERE name = ${ name }
        RETURNING name
    `
    return result
}

export async function updateProject(oldName : string, newName : string) {
    const result = await sql`
        UPDATE project
        SET name = ${ newName }
        WHERE name = ${ oldName }
        RETURNING name
    `
    return result
}