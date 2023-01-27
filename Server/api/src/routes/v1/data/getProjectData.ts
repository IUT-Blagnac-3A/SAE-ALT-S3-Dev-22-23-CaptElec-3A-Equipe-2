import { Request, Response } from "express";
import { getAllDataFromProject } from "../../../models/data.js";

export default async function getProjectData(req: Request, res: Response) {
    console.log("req : ", req);
    
    const project = req.params.project;

  console.log("project : ", project);
  
  console.log("hello there");
  
  await getAllDataFromProject(project)
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log("error in handler : ", e);
      res.status(500).send({ error: "" + e });
    });
}