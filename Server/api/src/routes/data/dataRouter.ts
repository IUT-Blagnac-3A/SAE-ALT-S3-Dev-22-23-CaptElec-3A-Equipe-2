import * as express from 'express';
import getData from './getData.js';
import getDataFromDevice from './getDataByDeviceName.js';

export const dataRouter = express.Router()

dataRouter.get("/", getData)
dataRouter.get("/:deviceName", getDataFromDevice)