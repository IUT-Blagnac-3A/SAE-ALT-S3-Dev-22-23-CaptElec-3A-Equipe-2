import * as express from 'express';
import { projectRouter } from './project/projectRouter.js';
import { dataRouter } from './data/dataRouter.js';

export const v1Routes = express.Router();

v1Routes.use("/data", dataRouter)
v1Routes.use("/project", projectRouter)