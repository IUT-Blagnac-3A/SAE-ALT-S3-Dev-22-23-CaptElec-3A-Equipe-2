import * as express from 'express';
import getData from './getData.js';
import getDataFromDevice from './getDataByDeviceName.js';
import getDataByRoom from './getDataByRoom.js';

export const dataRouter = express.Router()

dataRouter.get("/", getData)
dataRouter.get("/:deviceName", getDataFromDevice)
dataRouter.get('/:project/:room', getDataByRoom)
