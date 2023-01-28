import { Request, Response } from "express";
import { removeUserProject } from "../../../models/userProject.js";

export default async function removeUserToProject(req: Request, res: Response) {
    const project = req.params.project
    const username = req.params.username

    await removeUserProject(username, project)
        .then(() => {
            console.log(res, " user has been successfully added to the project.");
            res.send({'message' : 'user has been successfully added to the project.'})
            return
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
            return
        });
}