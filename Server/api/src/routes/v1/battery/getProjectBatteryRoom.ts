import { Request, Response } from "express";
import { getBatteryFromRoomProject } from "../../../models/battery.js";

export default async function getProjectBatteryRoom(req: Request, res: Response) {
    const project = req.params.project;
    const room = req.params.room;
    
    await getBatteryFromRoomProject(room, project)
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