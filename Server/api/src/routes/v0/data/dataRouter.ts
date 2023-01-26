import * as express from 'express';
import getData from './getData.js';
import getDataFromDevice from './getDataByDeviceName.js';
import getDataFromProjectTypeHandler from './getDataByProjectType.js';
import getDataByRoom from './getDataByRoom.js';
import getDataFromTypeHandler from './getDataType.js';

export const dataRouter = express.Router()

dataRouter.get("/", getData)
dataRouter.get("/type/:type", getDataFromTypeHandler)
dataRouter.get("/project/:project/type/:type", getDataFromProjectTypeHandler)
dataRouter.get("/:deviceName", getDataFromDevice)
dataRouter.get('/:project/:room', getDataByRoom)
