const mqttHandler = require('./mqttHandler')
const room = require('./roomCallback')
const data = require('./dataCallback')

const mqttBattery = new mqttHandler('mqtt://chirpstack.iut-blagnac.fr')
const mqttData = new mqttHandler('mqtt://chirpstack.iut-blagnac.fr')

mqttBattery.connect('application/1/device/+/event/status', room)
mqttData.connect('application/1/device/+/event/up', data)