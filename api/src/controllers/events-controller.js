const { EventsCreated} = require('../db')

const createEvent = async (req, res) => {
    const {description, price, date, artist, place, stock, category} = req.body

    try {
        const newEvent = await EventsCreated.create({
            description,
            price,
            date,
            artist,
            place,
            stock,
            category
        })
        res.json({
            eventsCreated: newEvent
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createEvent
}