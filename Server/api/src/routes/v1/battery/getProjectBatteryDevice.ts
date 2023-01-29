import { Request, Response } from "express";
import { getProjectBatteryFromDevice } from "../../../models/battery.js";

export default async function getProjectBatteryDevice(req: Request, res: Response) {
    const project = req.params.project;
    const device = req.params.device;
    
    await getProjectBatteryFromDevice(project, device)
        .then((result) => {
            res.send(result);
            return
        })
        .catch((e) => {
            console.log("error in handler : ", e);
            res.status(500).send({ error: "" + e });
            return
        });
    }