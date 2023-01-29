import * as express from "express";
import userProjectMiddleware from "../../../middleware/userProject.js";
import addProjectSensor from "./addSensor.js";
import addUserToProject from "./addUserToProject.js";

import getProject from "./getProject.js";
import getProjectSensorRoom from "./getProjectSensorRoom.js";
import getProjectSensors from "./getProjectSensors.js";
import newProject from "./newProject.js";
import removeProject from "./removeProject.js";
import removeProjectSensor from "./removeSensor.js";
import removeUserToProject from "./removeUserToProject.js";

export const projectRouter = express.Router()

projectRouter.get("/", getProject)
projectRouter.post("/", newProject)
projectRouter.delete("/:project", userProjectMiddleware, removeProject)
projectRouter.get("/addUser/:project/:username", userProjectMiddleware, addUserToProject)
projectRouter.get("/removeUser/:project/:username", userProjectMiddleware, removeUserToProject)
projectRouter.get("/sensors/:project", getProjectSensors)
projectRouter.get("/sensors/:project/:room", getProjectSensorRoom)
projectRouter.post("/sensors", addProjectSensor)
projectRouter.delete("/sensors/:project/:room", removeProjectSensor)