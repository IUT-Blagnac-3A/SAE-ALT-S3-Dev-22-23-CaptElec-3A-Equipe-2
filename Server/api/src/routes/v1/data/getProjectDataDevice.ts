import { Request, Response } from "express";
import { getProjectDataFromDevice } from "../../../models/data.js";

export default async function getProjectDataDevice(req: Request, res: Response) {
  const { project, device } = req.params;

  await getProjectDataFromDevice(project, device)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error in handler : ", e);
      res.status(500).send({ error: "" + e });
    });
}