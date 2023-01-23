const db = require('./db')

function batteryCallback(res) {
    const ts_temp = Date.now()

    const datas = {
        name_device:res.name_device,
        ts:ts_temp,
        battery:res.battery 
    }
    console.log(datas)
    db.insertDatasToBattery(datas)
}

module.exports = batteryCallback