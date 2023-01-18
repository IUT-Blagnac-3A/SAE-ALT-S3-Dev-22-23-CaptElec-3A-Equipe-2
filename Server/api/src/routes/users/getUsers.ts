import { Request, Response } from "express"

export default function getUsers(req: Request, res: Response) {
    res.send([])
}