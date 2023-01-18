const mqtt = require('mqtt');
const db = require('./db')

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
        this.mqttClient.subscribe('application/1/device/+/event/up')

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            const ts_temp = Date.now()
            var res = JSON.parse(message.toString())
            var datas = {   deviceName:res.deviceName,
                            ts:ts_temp,
                            activity:res.object.activity,
                            co2:res.object.co2,
                            humidity:res.object.humidity,
                            pressure:res.object.pressure,
                            temperature:res.object.temperature }
            console.log(datas)
            db.insertDatasToMqttData(datas)
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }
}

module.exports = MqttHandler;