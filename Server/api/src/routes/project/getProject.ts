import { Request, Response } from "express";
import { getAllProject } from '../../models/project.js'

export default async function getProject (_req: Request, res: Response) {
    await getAllProject()
        .then(result => {
            console.log(res);
            res.send(result)
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ 'error' : '' + error})
        });
}