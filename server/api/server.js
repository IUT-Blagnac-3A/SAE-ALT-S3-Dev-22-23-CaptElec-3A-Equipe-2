const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const db = require('./postgres');

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/data', async (req, res) => {
    const result = await db.query('select * from mqtt_data');
    res.json(result.rows)
})

app.get('/data/:deviceName', async (req, res) => {
    dN = req.params.deviceName
    const result = await db.query('select  * from mqtt_data where deviceName = $1', [dN])
    res.json(result.rows)
})

app.listen(3000, () => {
    console.log('App runnig on port 3000')
})