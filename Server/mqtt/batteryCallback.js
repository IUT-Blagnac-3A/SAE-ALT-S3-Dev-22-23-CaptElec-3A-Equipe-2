const db = require('./db')

function batteryCallback(res) {
    const ts_temp = Date.now()

    const datas = {
        deveui:res.devEUI,
        ts:ts_temp,
        battery:res.batteryLevel 
    }

    try {
        console.log(datas)
        db.insertBattery(datas)
    } catch (error) {
        console.log(error)
    }
}

module.exports = batteryCallback