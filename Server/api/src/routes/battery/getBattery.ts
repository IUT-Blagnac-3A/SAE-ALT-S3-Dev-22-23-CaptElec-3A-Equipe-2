import { Request, Response } from "express";
import { getAllBattery } from "../../models/battery.js";

export default async function getBattery(req: Request, res: Response) {
    await getAllBattery().then(result => {
        console.log(result)
        res.send(result)
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });
    
}