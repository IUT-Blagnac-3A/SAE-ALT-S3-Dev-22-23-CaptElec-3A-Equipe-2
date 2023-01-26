import { Request, Response } from "express";
import { getDataFromRoomProject } from "../../../models/data.js";

export default async function getDataByRoom(req: Request, res: Response) {
    const project: string = req.params.project
    const room: string = req.params.room

    await getDataFromRoomProject(project, room)
    .then(result => {
        console.log(result)

        res.send(result)
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });    
}