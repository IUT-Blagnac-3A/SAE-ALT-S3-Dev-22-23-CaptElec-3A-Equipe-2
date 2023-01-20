import * as express from "express";

import getBattery from "./getBattery.js";
import getDataFromDevice from "./getBatteryByDeviceName.js";

export const batteryRouter = express.Router()

batteryRouter.get("/", getBattery)
batteryRouter.get("/:deviceName", getDataFromDevice)