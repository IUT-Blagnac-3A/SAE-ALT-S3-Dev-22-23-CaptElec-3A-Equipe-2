import { Request, Response } from "express";
import { getDataFromProjectType } from "../../models/data.js";
import { DataType } from "../../utils/dataType.js";

export default async function getDataFromProjectTypeHandler (req: Request, res: Response) {
    const project: string = req.params.project
    const type: string = req.params.type

    if (!Object.values(DataType).includes(type as DataType)) {
        res.status(400).send("Invalid data type");
        return;
    }
    await getDataFromProjectType(project, type)
    .then(result => {
        console.log(result)
        res.send(result)
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });
}