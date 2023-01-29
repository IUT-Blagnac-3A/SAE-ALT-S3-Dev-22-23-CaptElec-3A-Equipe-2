import { sql } from "../config/dbConnection.js"

export type Data = {
    id: number
    name: string
}

export async function getAllUserProject(username: string) {
    const result = await sql<Data[]>`
        SELECT * FROM project p, user_project up
        WHERE p.name = up.project_name
        AND up.username = ${ username }
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function insertProject(name : string) {
    const result = await sql`
        INSERT INTO project ( name )
        VALUES ( ${ name })
        RETURNING name
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function deleteProject(name : string) {
    const result = await sql`
        DELETE FROM project
        WHERE name = ${ name }
        RETURNING name
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}

export async function updateProject(oldName : string, newName : string) {
    const result = await sql`
        UPDATE project
        SET name = ${ newName }
        WHERE name = ${ oldName }
        RETURNING name
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    return result
}