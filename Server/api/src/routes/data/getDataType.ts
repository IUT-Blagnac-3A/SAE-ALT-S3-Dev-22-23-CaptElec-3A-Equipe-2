import { Request, Response } from "express";
import { getDataFromType } from "../../models/data.js";
import { DataType } from "../../utils/dataType.js";

export default async function getDataFromTypeHandler(req: Request, res: Response) {
    console.log("hello request");
    
    const dataType: string = req.params.type;
    console.log(dataType);
    

    if (!Object.values(DataType).includes(dataType as DataType)) {
        res.status(400).send("Invalid data type");
        return;
    }

    const result = await getDataFromType(dataType);
    res.send(result);
}