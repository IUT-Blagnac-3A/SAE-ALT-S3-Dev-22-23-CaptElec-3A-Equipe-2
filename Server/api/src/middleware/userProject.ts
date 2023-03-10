import { Request, Response, NextFunction } from "express";
import { checkUserProject } from "../models/user.js";
import getPayload from "../utils/getPayload.js";

export default async function userProjectMiddleware(req: Request, res: Response, next: NextFunction) {
    const payload = getPayload(req)
    const project = req.params.project;

    await checkUserProject(payload.username, project)
        .then(result => {
            if (!result) {
                res.status(401).send("Project not found for this user")
                return
            }

            next();
        })
        .catch((e) => {
            console.log('error in handler : ', e)
            res.status(500).send({ "error" : '' + e})
            return
        });
}