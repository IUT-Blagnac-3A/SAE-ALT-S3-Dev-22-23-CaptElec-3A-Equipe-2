const db = require('./db')
const room = require('./roomList.json')

function dataCallback(res) {
    const ts_temp = Date.now()

    const datas = {
        name_device:res.deviceName,
        name_room:room[res.deviceName],    
        ts:ts_temp,
        activity:res.object.activity,
        co2:res.object.co2,
        humidity:res.object.humidity,
        pressure:res.object.pressure,
        temperature:res.object.temperature
    }
    console.log(datas)
    db.insertDatasToDevice(datas)
}

module.exports = dataCallback