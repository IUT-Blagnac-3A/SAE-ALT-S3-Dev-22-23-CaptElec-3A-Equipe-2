const mqttHandler = require('./mqttHandler')
const room = require('./roomCallback')
const data = require('./dataCallback')

const mqttBattery = new mqttHandler('mqtt://chirpstack.iut-blagnac.fr', 'application/1/device/+/event/status')
const mqttData = new mqttHandler('mqtt://chirpstack.iut-blagnac.fr', 'application/1/device/+/event/up')

const handlers = [
    {handler: mqttBattery, callback: room},
    {handler: mqttData, callback: data}
]

handlers.forEach(e => {
    e.handler.connect(e.callback)
})