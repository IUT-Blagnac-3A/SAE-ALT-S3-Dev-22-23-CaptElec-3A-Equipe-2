import { Request, Response, NextFunction } from "express";

export default function corsMiddleware(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    if ("OPTIONS" === req.method) {
      res.sendStatus(200);
      return
    } else {
      console.log(`${req.ip} ${req.method} ${req.url}`);
      next();
    }
}