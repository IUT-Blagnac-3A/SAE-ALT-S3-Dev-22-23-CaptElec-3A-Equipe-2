import * as express from "express";
import authMiddleware from "../../middleware/auth.js";
import getPayload from "../../utils/getPayload.js";
import login from "./login.js";
import register from "./register.js";

export const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.get("/protected", authMiddleware, (req, res) => {
    const payload = getPayload(req)

    res.send({ message: "Welcome " + payload.username})
})