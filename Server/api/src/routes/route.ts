import * as express from "express";
import getUsers from "./users/getUsers.js";
import postUser from "./users/postUser.js";

import getData from "./data/getData.js";
import getDataFromDevice from "./data/getDataByDeviceName.js";
import getSvgs from "./svgs/getSvgs.js";
import login from "./auth/login.js";
import authMiddleware from "../middleware/auth.js";
import register from "./auth/register.js";
import getPayload from "../utils/getPayload.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDirName = __dirname.split("\\");
srcDirName.pop();

console.log(path.join(srcDirName.join("\\"), "database"));

export const routes = express.Router();

routes.get("/", (req, res) => res.send({ hello: "world" }));

routes.get("/users", getUsers);
routes.post("/users", postUser);

routes.get("/data", getData);
routes.get("/data/:deviceName", getDataFromDevice);

routes.post("/login", login);
routes.post("/register", register);
routes.get("/protected", authMiddleware, (req, res) => {
  const payload = getPayload(req);

  res.send({ message: "Welcome " + payload.username });
});

routes.post("/svgs/:firstname/:lastname/:id/:projectname", getSvgs);

routes.get("*", (req, res) => {
  res.send({ error: "404 No page found" });
});
