import express, { Express } from "express";
import { routes } from "./routes";

// Create a new express application instance
const app: Express = express();

// Allow any method from any host and log requests
app.use((req, res, next) => {
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
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());
app.use("/", routes);

// start our server on port 4001
app.listen(4001, "localhost", function () {
  console.log("✔ Backend Server now listening on 4001");
});
