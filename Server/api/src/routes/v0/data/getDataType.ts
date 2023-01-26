import { Request, Response } from "express";
import { getDataFromType } from "../../../models/data.js";
import { DataType } from "../../../utils/dataType.js";

export default async function getDataFromTypeHandler(req: Request, res: Response) {
    console.log("hello request");
    
    const dataType: string = req.params.type;
    console.log(dataType);
    

    if (!Object.values(DataType).includes(dataType as DataType)) {
        res.status(400).send("Invalid data type");
        return;
    }

    await getDataFromType(dataType)
    .then(result => {
        console.log(result)
        res.send(result)
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });
}