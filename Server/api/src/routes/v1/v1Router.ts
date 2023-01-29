import * as express from 'express';
import { projectRouter } from './project/projectRouter.js';
import { dataRouter } from './data/dataRouter.js';
import { batteryRouter } from './battery/batteryRouter.js';
import authMiddleware from '../../middleware/auth.js';
import { authRouter } from './auth/authRouter.js';
import { mqttRouter } from './mqtt/mqttRouter.js';

export const v1Routes = express.Router();

v1Routes.use("/auth", authRouter)
v1Routes.use("/data", authMiddleware, dataRouter)
v1Routes.use("/project", authMiddleware, projectRouter)
v1Routes.use("/battery", authMiddleware, batteryRouter)
v1Routes.use("/mqtt", authMiddleware, mqttRouter)