import { Request, Response } from "express";
import { addUser, User } from "../../models/user.js";

export default async function register(req:Request, res: Response) {
    const user: User = {
        id: "fjksqdfq",
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, 
    }

    await addUser(user)

    res.send("User created")
}