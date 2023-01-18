const mqtt = require('mqtt');
const db = require('./db')
const room = require('./roomList.json')
const projet = require('./projetList.json')

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = 'mqtt://chirpstack.iut-blagnac.fr';
    }

    connect() {
        // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host);

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe('application/1/device/+/event/status')

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            const ts_temp = Date.now()
            var res = JSON.parse(message.toString())
            var datas = {   projet:projet[room[res.deviceName]],
                            room:room[res.deviceName],
                            deviceName:res.deviceName,
                            ts:ts_temp,
                            battery:res.batteryLevel }
            console.log(datas)
            db.insertDatasToRoom(datas)
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }
}

module.exports = MqttHandler;