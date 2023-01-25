import { Request, Response } from "express";
import { getAllData } from '../../models/data.js'

export default async function getData (_req: Request, res: Response) {
    await getAllData()
        .then(result => {
            console.log(res);
            res.send(result)
        })
        .catch((e) => {
            console.log('error in handler : ', e)
            res.status(500).send({ "error" : '' + e})
        });
}