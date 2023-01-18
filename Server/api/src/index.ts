import express, { Express, Request, Response } from 'express';
import { getAllData, getDatasFromDevice } from './db.js';
import { routes } from './route.js';

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

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World !')
})

app.get('/data', async (_req: Request, res: Response) => {
    const result = await getAllData();
    console.log(result)
    res.json(result)
})

app.get('/data/:deviceName',async (req:Request, res:Response) => {
    const deviceName: string = req.params.deviceName;
    const result = await getDatasFromDevice(deviceName)
    console.log(result)
    res.json(result)
})

app.listen(3000, () => {
    console.log('App running on port 3000')
})