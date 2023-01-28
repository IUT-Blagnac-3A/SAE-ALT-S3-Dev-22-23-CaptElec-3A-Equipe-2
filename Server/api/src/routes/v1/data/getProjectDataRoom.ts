import { Request, Response } from "express";
import { getDataFromRoomProject } from "../../../models/data.js";

export default async function getProjectDataRoom(req: Request, res: Response) {
  const { project, room } = req.params;

  await getDataFromRoomProject(project, room)
    .then((result) => {
      res.send(result);
      return
    })
    .catch((e) => {
      console.log("error in handler : ", e);
      res.status(500).send({ error: "" + e });
      return
    });
}