import { Request, Response } from "express";
import { deleteProject } from '../../models/project.js'

export default async function removeProject (req: Request, res: Response) {
    const name: string = req.params.name
    await deleteProject( name )
        .then(result => {
            console.log(res, " project has been successfully removed to the database.");
            res.send({'message' : 'project has been successfully removed to the database.'})
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
        });
}
