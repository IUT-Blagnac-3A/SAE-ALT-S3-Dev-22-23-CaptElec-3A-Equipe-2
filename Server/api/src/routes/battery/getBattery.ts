import { Request, Response } from "express";
import { getAllBattery } from "../../models/battery";

export default async function getBattery(req: Request, res: Response) {
    const result = await getAllBattery();
    console.log(result)
    res.send(result)
}