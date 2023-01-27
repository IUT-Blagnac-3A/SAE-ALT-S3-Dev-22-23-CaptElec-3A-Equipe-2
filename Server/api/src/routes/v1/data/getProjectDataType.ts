import { Request, Response } from "express";
import { getDataFromProjectType } from "../../../models/data.js";

export default async function getProjectDataType(req: Request, res: Response) {
    const { project, type } = req.params;
    
    await getDataFromProjectType(project, type)
        .then((result) => {
        res.send(result);
        })
        .catch((e) => {
        console.log("error in handler : ", e);
        res.status(500).send({ error: "" + e });
        });
    }