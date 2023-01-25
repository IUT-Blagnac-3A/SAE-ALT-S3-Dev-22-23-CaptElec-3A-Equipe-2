import { Request, Response } from "express";
import { updateProject } from '../../models/project.js'

export default async function modifyProject (req: Request, res: Response) {
    const oldName: string = req.params.oldName
    const newName: string = req.params.newName
    var result
    try {
        result = await updateProject( oldName , newName );
        console.log(result, " project has been successfully modified to the database.")
    } catch (error) {
        result = error
        console.log(error)
    }
    res.send(result)
}
