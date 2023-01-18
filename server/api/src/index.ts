import express, { Express, Request, Response } from 'express';
import { getAllData, getDatasFromDevice } from './db.js';

const app: Express = express();

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