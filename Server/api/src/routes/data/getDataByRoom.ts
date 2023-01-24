import { Request, Response } from "express";
import { getDataFromRoomProject } from "../../models/data.js";

export default async function getDataByRoom(req: Request, res: Response) {
    const project: string = req.params.project
    const room: string = req.params.room

    const result = await getDataFromRoomProject(project, room);
    console.log(result)

    res.send(result)    
}