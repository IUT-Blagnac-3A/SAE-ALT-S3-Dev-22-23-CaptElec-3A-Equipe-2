const db = require('./db')
const mqttHandler = require('./mqttHandler')
const battery = require('./batteryCallback')
const data = require('./dataCallback')

var handlers = []

db.getMqttFlux()
    .then(result => {
        result.forEach(flux => handlers.push(
        {
            handler: new mqttHandler(flux['host'], flux['topic']),
            callback:   function(){
                            if (flux['type'] == 'data') {
                                return data;
                            } else if (flux['type'] == 'battery') {
                                return battery;
                            } 
                        }
        }))})
        .catch((error) => {
            console.log(error)
        });

handlers.forEach(hdl => {
    hdl.handler.connect(hdl.callback)
})