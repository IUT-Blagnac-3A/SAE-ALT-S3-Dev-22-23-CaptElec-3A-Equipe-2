import * as express from "express";
import getUsers from './users/getUsers.js';
import postUser from './users/postUser.js';

import getData from './data/getData.js';
import getDataFromDevice from './data/getDataByDeviceName.js'
import login from "./auth/login.js";
import authMiddleware from "../middleware/auth.js";
import register from "./auth/register.js";
import getPayload from "../utils/getPayload.js";
import getBattery from "./battery/getBattery.js";
import { getBatteryFromDevice } from "../models/battery.js";

export const routes = express.Router();

routes.get("/", (req, res) => res.send({ hello: "world" }));

routes.get("/users", getUsers);
routes.post("/users", postUser);

routes.get("/data", getData)
routes.get("/data/:deviceName", getDataFromDevice)

routes.get("/battery", getBattery)
routes.get("/battery/:deviceName", getBatteryFromDevice)

routes.post("/login", login)
routes.post("/register", register)
routes.get("/protected", authMiddleware, (req, res) => {
    const payload = getPayload(req)

    res.send({ message: "Welcome " + payload.username})
})