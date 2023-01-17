const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const db = require('../mqtt/db');

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/data', async (req, res) => {
    const result = await db.getAllData();
    console.log(result)
    res.json(result)
})

app.get('/data/:deviceName', async (req, res) => {
    deviceName = req.params.deviceName
    const result = await db.getDatasFromDevice(deviceName)
    console.log(result)
    res.json(result)
})

app.listen(3000, () => {
    console.log('App runnig on port 3000')
})