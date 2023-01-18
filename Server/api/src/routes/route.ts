import * as express from "express";
import getUsers from './users/getUsers.js';
import postUser from './users/postUser.js';

import getData from './data/getData.js';
import getDataFromDevice from './data/getDataByDeviceName.js'

export const routes = express.Router();

routes.get("/", (req, res) => res.send({ hello: "world" }));

routes.get("/users", getUsers);
routes.post("/users", postUser);

routes.get("/data", getData)
routes.get("/data/:deviceName", getDataFromDevice)