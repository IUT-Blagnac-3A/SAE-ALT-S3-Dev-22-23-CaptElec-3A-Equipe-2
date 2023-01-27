import * as express from 'express';
import { dataRouter } from './data/dataRouter.js';

export const v1Routes = express.Router();

v1Routes.use("/data", dataRouter)
