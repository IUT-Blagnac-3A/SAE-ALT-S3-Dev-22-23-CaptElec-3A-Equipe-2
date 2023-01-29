import * as express from "express";

import getProject from "./getProject.js";
import newProject from "./newProject.js";
import removeProject from "./removeProject.js";
import modifyProject from "./modifyProject.js";

export const projectRouter = express.Router()

projectRouter.get("/", getProject)
projectRouter.get("/new/:name", newProject)
projectRouter.get("/remove/:name", removeProject)
projectRouter.get("/modify/:oldName/:newName", modifyProject)