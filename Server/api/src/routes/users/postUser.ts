import { Request, Response } from "express"

export default function postUser(req: Request, res: Response) {
    res.send({ body: req.body })
}