import * as express from "express";

import { batteryRouter } from "./battery/batteryRouter.js";
import { authRouter } from "./auth/authRouter.js";
import { dataRouter } from "./data/dataRouter.js";

import getSvgs from "./svgs/getSvgs.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDirName = __dirname.split("\\");
srcDirName.pop();

console.log(path.join(srcDirName.join("\\"), "database"));

export const routes = express.Router();

routes.get("/", (req, res) => res.send({ hello: "world" }));

routes.use('/data', dataRouter)
routes.use('/battery', batteryRouter)

routes.use('/auth', authRouter)

routes.post("/svgs/:firstname/:lastname/:id/:projectname", getSvgs);

routes.get("*", (req, res) => {
  res.send({ error: "404 No page found" });
});
