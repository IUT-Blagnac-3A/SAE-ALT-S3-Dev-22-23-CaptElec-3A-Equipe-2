import { Request, Response} from "express";
import { getAllSensors } from "../../../models/sensors.js";

export default async function getProjectSensors(req: Request, res: Response) {
    const project: string = req.params.project;

    await getAllSensors(project)
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