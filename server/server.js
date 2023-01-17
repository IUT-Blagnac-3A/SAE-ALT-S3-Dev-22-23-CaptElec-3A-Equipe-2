const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('App runnig on port 3000')
})