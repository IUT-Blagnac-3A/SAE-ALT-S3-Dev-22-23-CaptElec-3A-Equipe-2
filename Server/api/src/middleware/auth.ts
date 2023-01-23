import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'

export type CustomRequest = {
    token: string | jwt.JwtPayload;
} & Request

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)

        const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.TOKEN_SECRET as string);
        (req as CustomRequest).token = decoded

        console.log('decoded : ', decoded)

        next()
    } catch (err) {
        res.status(401).send('Please authenticate')
    }
}