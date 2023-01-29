import * as express from "express";

import login from "./login.js";
import register from "./register.js";

export const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.post("/register", register)