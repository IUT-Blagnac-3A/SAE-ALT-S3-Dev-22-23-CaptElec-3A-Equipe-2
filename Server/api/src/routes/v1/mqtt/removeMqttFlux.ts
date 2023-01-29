import { Request, Response } from "express";
import { deleteMqttFlux } from '../../../models/mqtt.js'

export default async function getProject (req: Request, res: Response) {
    const name = req.params.name;

    await deleteMqttFlux(name)
        .then(result => {
            res.send({'message' : 'mqtt stream has been successfully removed.'})
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ 'error' : '' + error})
            return
        });
}