import { sql } from "../config/dbConnection.js"
import * as argon2 from 'argon2';

export type User = {
    id?: string
    username: string
    email: string
    password: string
}

export async function addUser(user: User) {
    user.password = await hashPassword(user.password)
    await sql`insert into users ${ sql(user, 'username', 'email', 'password')}`.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })
}

export async function getUserByUsername(username: string) {
    console.log(username)
    const result = await sql<User[]>`
        SELECT * FROM users WHERE username = ${ username }
    `.catch((e) => {
        console.log('error : ', e)
        throw new Error(e)
    })

    console.log(result)
    if (!result.length) throw new Error('Username or password incorrect')

    const user: User = result[0]
    return user
}

export async function checkUserProject(username: string, project: string) {
    const result = await sql<User[]>`
        SELECT * FROM users u, project p, user_project up
        WHERE u.username = up.username
        AND p.name = up.project_name
        AND u.username = ${ username }
        AND p.name = ${ project }
    `.catch(e => {
        console.log('error : ', e);
        throw new Error(e)
    })

    if (result.length == 0) return false

    return true
}

export async function hashPassword(password: string) {
    const hash = await argon2.hash(password)
    return hash
}

export async function checkPassword(password: string, passwordHash: string) {
    const compare = await argon2.verify(passwordHash, password)
    
    return compare
}