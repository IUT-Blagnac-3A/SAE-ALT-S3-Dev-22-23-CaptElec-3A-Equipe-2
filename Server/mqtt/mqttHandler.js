const mqtt = require('mqtt')

class MqttHandler {
    constructor(host, topic) {
        this.mqttClient = null;
        this.host = host;
        this.topic = topic;
    }

    connect(callback) {
        this.mqttClient = mqtt.connect(this.host)

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        this.mqttClient.subscribe(this.topic);

        this.mqttClient.on('message', function (topic, message) {
            const res = JSON.parse(message.toString())
            callback(res)
        })

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }
}

module.exports = MqttHandler