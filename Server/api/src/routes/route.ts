import * as express from "express";

import { batteryRouter } from "./v0/battery/batteryRouter.js";
import { authRouter } from "./v0/auth/authRouter.js";
import { dataRouter } from "./v0/data/dataRouter.js";

import getSvgs from "./v0/svgs/getSvgs.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authMiddleware from "../middleware/auth.js";
import userProjectMiddleware from "../middleware/userProject.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDirName = __dirname.split("\\");
srcDirName.pop();

console.log(path.join(srcDirName.join("\\"), "database"));

export const routes = express.Router();

routes.get("/", (req, res) => res.send({ hello: "world" }));

routes.use("/data", dataRouter);
routes.use("/project/:project", authMiddleware, userProjectMiddleware, dataRouter)
routes.use("/battery", batteryRouter);

routes.use("/auth", authRouter);

routes.post("/svgs/:username/:id/:projectname", getSvgs);

routes.get("*", (req, res) => {
  res.send({ error: "404 No page found" });
});
