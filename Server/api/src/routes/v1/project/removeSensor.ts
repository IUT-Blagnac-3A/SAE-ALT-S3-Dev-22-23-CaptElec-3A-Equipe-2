import { Request, Response } from "express";

import { deleteSensor } from "../../../models/sensors.js";

export default async function removeProjectSensor(req: Request, res: Response) {
    const project = req.params.project;
    const room = req.params.room;

    await deleteSensor(project, room)
        .then(() => {
            res.send({ "message": "sensor has been successfully removed from the database." })
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error": '' + error })
            return
        });
}