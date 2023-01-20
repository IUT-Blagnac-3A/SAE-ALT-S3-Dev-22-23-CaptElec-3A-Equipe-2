import { Request, Response } from "express";
import { getAllData } from '../../models/data.js'

export default async function getData (_req: Request, res: Response) {
    const result = await getAllData();
    console.log(result)
    res.send(result)
}