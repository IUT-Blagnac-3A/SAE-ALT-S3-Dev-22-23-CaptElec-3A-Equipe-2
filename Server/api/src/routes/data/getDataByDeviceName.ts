import { Request, Response } from "express";
import { getDatasFromDevice } from '../../models/data.js'

export default async function getDataFromDevice (req: Request, res: Response) {
    const deviceName: string = req.params.deviceName
    await getDatasFromDevice(deviceName)
    .then(result => {
        console.log(result)
        res.send(result)
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });
}