const db = require('./db')
const room = require('./roomList.json')
const projet = require('./projetList.json')

function roomCallback(res) {
    const ts_temp = Date.now()

    const rooms = {   projet:projet[room[res.deviceName]],
        room:room[res.deviceName],
        deviceName:res.deviceName,
        ts:ts_temp,
        battery:res.batteryLevel 
    }
    console.log(rooms)
    db.insertDatasToRoom(rooms)
}

module.exports = roomCallback