import express, { Express } from 'express';
import { routes } from './routes/route.js';
import corsMiddleware from './middleware/cors.js';
import bodyParser from 'body-parser';

const app: Express = express();

// Allow any method from any host and log requests
app.use(corsMiddleware);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Handle POST requests that come in formatted as JSON
app.use(express.json());
app.use("/", routes);

app.listen(3000, () => {
    console.log('App running on port 3000')
})