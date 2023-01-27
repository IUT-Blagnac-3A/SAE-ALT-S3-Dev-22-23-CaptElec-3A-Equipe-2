import { Request, Response } from "express";
import { insertProject } from '../../../models/project.js'
import { addUserProject } from "../../../models/userProject.js";
import getPayload from "../../../utils/getPayload.js";

export default async function newProject (req: Request, res: Response) {
    const payload = getPayload(req)

    const name: string = req.body.name

    await insertProject( name )
        .then(() => {
            console.log(res, " project has been successfully added to the database.");
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
        });

    await addUserProject(payload.username, name)
        .then(() => {
            console.log(res, " user has been successfully added to the project.");
            res.send({'message' : 'user has been successfully added to the project.'})
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
        });
}
