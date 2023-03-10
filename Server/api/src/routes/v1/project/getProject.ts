import { Request, Response } from "express";
import { getAllUserProject } from '../../../models/project.js'
import getPayload from "../../../utils/getPayload.js";

export default async function getProject (req: Request, res: Response) {
    const payload = getPayload(req)

    await getAllUserProject(payload.username)
        .then(result => {
            res.send(result)
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ 'error' : '' + error})
            return
        });
}