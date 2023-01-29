import * as express from "express";
import userProjectMiddleware from "../../../middleware/userProject.js";
import addUserToProject from "./addUserToProject.js";

import getProject from "./getProject.js";
import newProject from "./newProject.js";
import removeProject from "./removeProject.js";
import removeUserToProject from "./removeUserToProject.js";

export const projectRouter = express.Router()

projectRouter.get("/", getProject)
projectRouter.post("/", newProject)
projectRouter.delete("/:project", userProjectMiddleware, removeProject)
projectRouter.get("/addUser/:project/:username", userProjectMiddleware, addUserToProject)
projectRouter.get("/removeUser/:project/:username", userProjectMiddleware, removeUserToProject)