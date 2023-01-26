import { Request, Response } from "express";
import { updateProject } from '../../models/project.js'

export default async function modifyProject (req: Request, res: Response) {
    const oldName: string = req.params.oldName
    const newName: string = req.params.newName
    await updateProject( oldName,  newName )
        .then(result => {
            console.log(res, " project has been successfully modified to the database.");
            res.send(result)
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
        });
}
