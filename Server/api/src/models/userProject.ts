import { sql } from "../config/dbConnection.js"

export type UserProject = {
    username: string
    project_name: string
}

export async function addUserProject(username: string, project_name: string) {
    await sql`insert into user_project ${ sql({username, project_name}, 'username', 'project_name')}`.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })
}

export async function removeUserProject(username: string, project_name: string) {
    await sql`
        DELETE FROM user_project
        WHERE username = ${ username }
        AND project_name = ${ project_name }
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })
}