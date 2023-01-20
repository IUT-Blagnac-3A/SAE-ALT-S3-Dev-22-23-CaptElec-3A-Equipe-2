import * as express from "express";

import { batteryRouter } from "./battery/batteryRouter.js";
import { authRouter } from "./auth/authRouter.js";
import { dataRouter } from "./data/dataRouter.js";

export const routes = express.Router();

routes.get("/", (req, res) => res.send({ hello: "world" }));

routes.use('/data', dataRouter)

routes.use('/battery', batteryRouter)

routes.use('/auth', authRouter)