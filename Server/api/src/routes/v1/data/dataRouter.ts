import * as express from 'express';
import userProjectMiddleware from '../../../middleware/userProject.js';
// import userProjectMiddleware from '../../../middleware/userProject.js';
// import userProjectMiddleware from '../../../middleware/userProject.js';
import getProjectData from './getProjectData.js';
import getProjectDataDevice from './getProjectDataDevice.js';
import getProjectDataRoom from './getProjectDataRoom.js';
import getProjectDataType from './getProjectDataType.js';

export const dataRouter = express.Router()

dataRouter.get("/:project/all", userProjectMiddleware, getProjectData)
dataRouter.get("/:project/type/:type", userProjectMiddleware, getProjectDataType)
dataRouter.get("/:project/device/:device", userProjectMiddleware, getProjectDataDevice)
dataRouter.get("/:project/room/:room", userProjectMiddleware, getProjectDataRoom)