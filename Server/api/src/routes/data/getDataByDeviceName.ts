import { Request, Response } from "express";
import { getDatasFromDevice } from '../../db/dbConnection.js'

export default async function getDataFromDevice (req: Request, res: Response) {
    const deviceName: string = req.params.deviceName
    const result = await getDatasFromDevice(deviceName);
    console.log(result)
    res.send(result)
}