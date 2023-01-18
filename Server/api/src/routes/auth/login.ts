import { checkPassword, getUserByUsername, User } from "../../models/user.js"
import { Response, Request } from "express"
import jwt from 'jsonwebtoken'

export default async function login (req: Request, res: Response) {
    const user: User = await getUserByUsername(req.body.username)

    const goodPassword = checkPassword(req.body.password, user.password)

    if (!goodPassword) {
        res.status(401).send("Username or password incorrect")
        return
    }

    const token = jwt.sign(user, "process.env.TOKEN_SECRET", { expiresIn: '1800s'})

    res.send(token)
}