import * as express from 'express';
import getData from './getData.js';
import getDataFromDevice from './getDataByDeviceName.js';
import getDataByRoom from './getDataByRoom.js';
import getDataFromTypeHandler from './getDataType.js';

export const dataRouter = express.Router()

dataRouter.get("/", getData)
dataRouter.get("/type/:type", getDataFromTypeHandler)
dataRouter.get("/:deviceName", getDataFromDevice)
dataRouter.get('/:project/:room', getDataByRoom)
