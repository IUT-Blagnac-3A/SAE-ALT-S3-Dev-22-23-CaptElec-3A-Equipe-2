import { Request, Response } from "express";
import { insertProject } from '../../models/project.js'

export default async function newProject (req: Request, res: Response) {
    const name: string = req.params.name
    try {
        const result = await insertProject( name );
        console.log(result, " project has been successfully added to the database.")
        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
}
