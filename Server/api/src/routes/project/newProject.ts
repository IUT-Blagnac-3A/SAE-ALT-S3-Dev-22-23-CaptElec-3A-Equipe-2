import { Request, Response } from "express";
import { insertProject } from '../../models/project.js'

export default async function newProject (req: Request, res: Response) {
    const name: string = req.params.name
    await insertProject( name )
        .then(result => {
            console.log(res, " project has been successfully added to the database.");
            res.send(result)
        })
        .catch((error) => {
            console.log('error in handler : ', error)
            res.status(500).send({ "error" : '' + error})
        });
}
