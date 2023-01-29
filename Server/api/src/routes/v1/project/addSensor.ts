import { Request, Response } from "express";

import { addSensor } from "../../../models/sensors.js";

export default async function addProjectSensor(req: Request, res: Response) {
    const project = req.params.project;

    const deveui = req.body.deveui;
    const room = req.body.room_name;
    const device = req.body.device_name;

    await addSensor(device, deveui, project, room)
        .then(() => {
            res.send({ "message": "sensor has been successfully added to the database." })
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error": '' + error })
            return
        });
}