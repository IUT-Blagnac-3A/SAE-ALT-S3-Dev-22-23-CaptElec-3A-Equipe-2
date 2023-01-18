import express, { Express } from 'express';
import { routes } from './routes/route.js';

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

app.listen(3000, () => {
    console.log('App running on port 3000')
})