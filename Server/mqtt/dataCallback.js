const db = require('./db')
const room = require('./roomList.json')
const projet = require('./projetList.json')

function dataCallback(res) {
    const ts_temp = Date.now()

    const datas = {
        projet:projet[room[res.deviceName]],
        room:room[res.deviceName],    
        deviceName:res.deviceName,
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