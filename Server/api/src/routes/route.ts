import * as express from "express";

import getSvgs from "./v1/svgs/getSvgs.js";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { v1Routes } from "./v1/v1Router.js";
import corsMiddleware from "../middleware/cors.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDirName = __dirname.split("\\");
srcDirName.pop();

console.log(path.join(srcDirName.join("\\"), "database"));

export const routes = express.Router();

// routes.use("/v1/auth", authRouter);
routes.post("/v1/svgs/:username/:projectname", getSvgs);
routes.use("/v1", corsMiddleware, v1Routes);

routes.get("*", (req, res) => {
  res.send({ error: "404 No page found" });
});
