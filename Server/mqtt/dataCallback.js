const db = require('./db')
const rooms = require('./deviceToRoom.json')

function dataCallback(res) {
    const ts_temp = Date.now()

    const datas = {
        deveui:res.devEUI,   
        ts:ts_temp,
        activity:res.object.activity,
        co2:res.object.co2,
        humidity:res.object.humidity,
        pressure:res.object.pressure,
        temperature:res.object.temperature
    }

    try {
        console.log(datas)
        db.insertData(datas)
    } catch (error) {
        console.log(error)
    }
}

module.exports = dataCallback