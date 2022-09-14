const { Event } = require('../db')
const fs = require('fs')

const getEvents = async (req, res) => {
    

    const allEvents = await Event.findAll()
    const data = JSON.parse(fs.readFileSync('dataBase.json' ,'utf8'))
    // res.json(data)
      if (allEvents.length === 0) {
        const events = await Event.bulkCreate(data)
        res.json(events)
    } else {
        res.json(allEvents)
    }
    

}

module.exports = {
    getEvents
}