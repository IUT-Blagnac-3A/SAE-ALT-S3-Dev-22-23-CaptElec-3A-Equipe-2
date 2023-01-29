import { Request, Response } from "express";
import { getMqttFluxFromName } from '../../../models/mqtt.js'

export default async function getProject (req: Request, res: Response) {
    const name = req.params.name;

    await getMqttFluxFromName(name)
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