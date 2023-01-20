import { Request, Response } from "express";
import { getBatteryFromDevice } from "../../models/battery.js";

export default async function getDataFromDevice (req: Request, res: Response) {
    const deviceName: string = req.params.deviceName
    const result = await getBatteryFromDevice(deviceName);
    console.log(result)
    res.send(result)
}