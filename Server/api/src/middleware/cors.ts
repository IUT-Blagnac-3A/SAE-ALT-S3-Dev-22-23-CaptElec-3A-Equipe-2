import { Request, Response, NextFunction } from "express";

export default function corsMiddleware(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    if ("OPTIONS" === req.method) {
      res.sendStatus(200);
    } else {
      console.log(`${req.ip} ${req.method} ${req.url}`);
      next();
    }
}