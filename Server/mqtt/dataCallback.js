const db = require('./db')

function dataCallback(res) {
    const ts_temp = Date.now()

    const datas = {   deviceName:res.deviceName,
        ts:ts_temp,
        activity:res.object.activity,
        co2:res.object.co2,
        humidity:res.object.humidity,
        pressure:res.object.pressure,
        temperature:res.object.temperature 
    }
    console.log(datas)
    db.insertDatasToMqttData(datas)
}

module.exports = dataCallback