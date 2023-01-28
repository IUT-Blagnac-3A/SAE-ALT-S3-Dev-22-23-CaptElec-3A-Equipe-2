import { Request, Response } from "express";
import { deleteProject } from '../../../models/project.js'
import { removeUserProject } from "../../../models/userProject.js";
import getPayload from "../../../utils/getPayload.js";

export default async function removeProject (req: Request, res: Response) {
    const name: string = req.params.project
    const payload = getPayload(req)

    await removeUserProject(payload.username, name).then(async () => {
        console.log(res, " user has been successfully removed from the project.");

        await deleteProject( name )
        .then(() => {
            console.log(res, " project has been successfully removed to the database.");
            res.send({'message' : 'project has been successfully removed to the database.'})
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
            return
        });
    }).catch((error) => {
        console.log('error in handler : ', error)
        res.status(500).send({ "error" : '' + error})
        return
    });
}
