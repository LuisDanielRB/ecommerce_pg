const { EventsCreated, Event} = require('../db')
const fs = require('fs')
const uploadImage = require('../helpers/cloudinary')
const fsExtra = require('fs-extra')

const createEvent = async (req, res) => {
    const {description, price, date, artist, place, stock, category} = req.body
    var result;
    try {
        if(req.files?.image){
            result = await uploadImage(req.files.image.tempFilePath);
            await fsExtra.unlink(req.files.image.tempFilePath)
        }

        const newEvent = await EventsCreated.create({
            description,
            price,
            date,
            artist,
            place,
            stock,
            category,
            image: result?result.secure_url:'undefined'
        })
        res.json({
            eventsCreated: newEvent
        })
    } catch (error) {
        console.log(error)
    }
}

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
    createEvent,
    getEvents

}