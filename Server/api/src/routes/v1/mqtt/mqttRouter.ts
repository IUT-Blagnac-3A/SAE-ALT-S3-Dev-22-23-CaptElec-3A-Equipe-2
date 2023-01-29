import * as express from "express";

import getMqttFlux from "./getMqttFlux.js";
import getMqttFluxName from "./getMqttFluxName.js";
import newMqttFlux from "./newMqttFlux.js";
import removeMqttFlux from "./removeMqttFlux.js";

export const mqttRouter = express.Router()

mqttRouter.get("/", getMqttFlux)
mqttRouter.get("/:name", getMqttFluxName)
mqttRouter.post("/addMqtt", newMqttFlux)
mqttRouter.get("/removeMqtt/:name", removeMqttFlux)