import { Request, Response } from "express";
import { getAllBatteryFromProject } from "../../../models/battery.js";

export default async function getProjectBattery(req: Request, res: Response) {
  const project = req.params.project;

  await getAllBatteryFromProject(project)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error in handler : ", e);
      res.status(500).send({ error: "" + e });
    });
}