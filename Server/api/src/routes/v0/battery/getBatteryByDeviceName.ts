import { Request, Response } from "express";
import { getBatteryFromDevice } from "../../../models/battery.js";

export default async function getDataFromDevice (req: Request, res: Response) {
    const deviceName: string = req.params.deviceName
    await getBatteryFromDevice(deviceName)
    .then(result => {
        console.log(result)
        res.send(result)
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });
}