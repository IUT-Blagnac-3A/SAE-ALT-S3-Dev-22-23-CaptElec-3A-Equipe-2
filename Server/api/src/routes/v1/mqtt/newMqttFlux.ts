import { Request, Response } from "express";
import { insertMqttFlux } from '../../../models/mqtt.js'

export default async function getProject (req: Request, res: Response) {
    const name : string = req.body.name
    const host : string = req.body.host
    const topic : string = req.body.topic
    const type : string = req.body.type

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