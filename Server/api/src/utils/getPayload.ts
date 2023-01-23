import { Request } from "express";
import jwt from 'jsonwebtoken';

export type TokenInterface = {
    id: string;
    username: string;
    email: string;
}

export default function getPayload(req: Request) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    const payload = jwt.decode(token)
    
    return payload as TokenInterface
}