const db = require('./db')
const projects = require('./roomToProject.json')
const datas = require('./datasToInsert.json')

datas.projects.forEach(project => {
    const datasProject = {
        name_project:project
    }
    console.log(datasProject)
    db.insertDatasToProject(datasProject)
})

datas.rooms.forEach(room => {
    const datasRoom = {
        name_room:room,
        name_project:projects[room]
    }
    console.log(datasRoom)
    db.insertDatasToRoom(datasRoom)
})
