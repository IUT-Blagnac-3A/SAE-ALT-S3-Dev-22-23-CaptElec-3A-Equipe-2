import { Request, Response } from "express";
import { getAllProject } from '../../models/project.js'

export default async function getProject (_req: Request, res: Response) {
    const result = await getAllProject();
    console.log(result)
    res.send(result)
}