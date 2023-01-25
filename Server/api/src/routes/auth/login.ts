import { checkPassword, getUserByUsername } from "../../models/user.js"
import { Response, Request } from "express"
import jwt from 'jsonwebtoken'

export default async function login (req: Request, res: Response) {
    await getUserByUsername(req.body.username)
        .then(async user => {
            console.log(req.body.password);
            console.log(user);
            
            
            const goodPassword = await checkPassword(req.body.password, user.password)

            console.log("bool : ", goodPassword);
            

            if (!goodPassword) {
                res.status(401).send({ 'error' : "Username or password incorrect"})
                return
            }

            const token = jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: '1800s'})

            res.send({ 'token': token })
        })
        .catch((e) => {
            console.log('error in handler : ', e)
            res.status(500).send({ "error" : '' + e})
        });
        
}