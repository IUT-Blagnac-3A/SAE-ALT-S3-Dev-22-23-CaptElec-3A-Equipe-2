import { Request, Response } from "express";
import { insertMqttFlux } from '../../../models/mqtt.js'

export default async function getProject (req: Request, res: Response) {
    const name : string = req.params.name
    const host : string = req.params.host
    const topic : string = req.params.topic
    const type : string = req.params.type

    await insertMqttFlux(name, host, topic, type)
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