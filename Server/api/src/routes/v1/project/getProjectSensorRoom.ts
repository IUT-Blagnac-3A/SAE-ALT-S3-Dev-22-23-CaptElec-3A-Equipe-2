import { Request, Response } from "express";
import { getSensorRoom } from "../../../models/sensors.js";

export default async function getProjectSensorRoom(req: Request, res: Response) {
    const project: string = req.params.project;
    const room: string = req.params.room;

    await getSensorRoom(project, room)
        .then(result => {
            res.send(result)
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ 'error' : '' + error})
            return
        }
    ); 
}