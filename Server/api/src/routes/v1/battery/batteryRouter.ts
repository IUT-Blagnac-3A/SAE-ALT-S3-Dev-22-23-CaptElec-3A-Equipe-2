import * as express from 'express';
import userProjectMiddleware from '../../../middleware/userProject.js';
import getProjectBattery from './getProjectBattery.js';
import getProjectBatteryDevice from './getProjectBatteryDevice.js';
import getProjectBatteryRoom from './getProjectBatteryRoom.js';

export const batteryRouter = express.Router()

batteryRouter.get("/:project/all", userProjectMiddleware, getProjectBattery)
batteryRouter.get("/:project/device/:device", userProjectMiddleware, getProjectBatteryDevice)
batteryRouter.get("/:project/room/:room", userProjectMiddleware, getProjectBatteryRoom)