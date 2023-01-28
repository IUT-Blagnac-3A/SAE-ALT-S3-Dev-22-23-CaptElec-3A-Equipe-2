import { Request, Response } from "express";
import { addUser, User } from "../../../models/user.js";

export default async function register(req:Request, res: Response) {
    const user: User = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    await addUser(user).then(() => {
        res.send({ message: "User created" })    
    })
    .catch((e) => {
        console.log('error in handler : ', e)
        res.status(500).send({ "error" : '' + e})
    });
}