import { Request, Response } from "express";
import { deleteProject } from '../../models/project.js'

export default async function removeProject (req: Request, res: Response) {
    const name: string = req.params.name
    var result
    try {
        result = await deleteProject( name );
        console.log(result, " project has been successfully removed to the database.")
    } catch (error) {
        result = error
        console.log(error)
    }
    res.send(result)
}
