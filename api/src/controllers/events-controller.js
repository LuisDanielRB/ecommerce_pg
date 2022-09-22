const { EventsCreated, Event} = require('../db')
const fs = require('fs')
const {uploadImage, deleteImage} = require('../helpers/cloudinary')
const fsExtra = require('fs-extra')

const createEvent = async (req, res) => {
    const {description, price, date, artist, place, stock, category} = req.body;
    const {id} = req.params;
    var result;
    try {
        if(!description) res.status(404).json({message: 'description is require'});
        if(!price) res.status(404).json({message: 'price is require'});
        if(!date) res.status(404).json({message: 'date is require'});
        if(!artist) res.status(404).json({message: 'artist is require'});
        if(!place) res.status(404).json({message: 'place is require'});
        if(!stock) res.status(404).json({message: 'stock is require'});
        if(!category) res.status(404).json({message: 'category is require'});
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
            image: result?result.secure_url:'undefined',
            imageId: result?result.public_id:'undefined',
            usersID: id
        })
        res.json({
            eventsCreated: newEvent
        })
    } catch (error) {
        console.log(error)
    }
}

const updateEvent = async (req, res) => {
    const {description, price, date, artist, place, stock, category} = req.body;
    const {id} = req.params;
    try {
        if(!id) res.status(404).json({message: 'id is require...'});
        let eventUpdate = await EventsCreated.findOne({where:{id}});
        if(!eventUpdate) res.status(404).json({message: 'event not found...'});

        if(description) await EventsCreated.update({description}, {where:{id}});
        if(price) await EventsCreated.update({price}, {where:{id}});
        if(date) await EventsCreated.update({date}, {where:{id}});
        if(artist) await EventsCreated.update({artist}, {where:{id}});
        if(place) await EventsCreated.update({place}, {where:{id}});
        if(stock) await EventsCreated.update({stock}, {where:{id}});
        if(category) await EventsCreated.update({category}, {where:{id}});
        if(req.files?.image){
            await deleteImage(eventUpdate.imageId);
            const result = await uploadImage(req.files.image.tempFilePath);
            await EventsCreated.update({image: result.secure_url,
                                        imageId: result.public_id},{where: {id}});
            await fsExtra.unlink(req.files.image.tempFilePath);
        }
        eventUpdate = await EventsCreated.findOne({where: {id}});
        res.status(200).json(eventUpdate);

    } catch (error) {
        console.log(error);
    }
}

const getEvents = async (req, res) => {
    
    const allEvents = await Event.findAll()
    const data = JSON.parse(fs.readFileSync('dataBase.json' ,'utf8'))

      if (allEvents.length === 0) {
        const events = await Event.bulkCreate(data)
        res.json(events)
    } else {
        res.json(allEvents)
    }

}

const getEventDetail = async (req, res, next) => {
    const { id } = req.params
    let detail;

    if(id.includes("-")){
        try{
            detail = await Event.findOne({
                where: {
                    id: id
                }
            })

    }catch(error){
        console.log(error)
    }
}else{
    try{
        const response = await EventsCreated.findOne({
            where: {
                id: id
            }
        })
        const elem = response.dataValues;
        detail = {
            id: elem.id,
            description: elem.description,
            price: elem.price,
            date: elem.date,
            artist: elem.artist,
            place: elem.place,
            stock: elem.stock,
            category: elem.category,
        }
    }catch(error){
        console.log(error)
    }
}
if(detail){
    res.send(detail)
} else {
    res.status(404).send("ID not found")
}
    
}

const getEventsDetailDb = async (req, res) => {

    const { id } = req.params
    let detail;

    if(id.includes("-")){
        try{
            detail = await Event.findOne({
                where: {
                    id: id
                }
            })

    }catch(error){
        console.log(error)
    }
}else{
    try{
        const response = await Event.findOne({
            where: {
                id: id
            }
        })
        const elem = response.dataValues;
        detail = {
            id: elem.id,
            description: elem.description,
            price: elem.price,
            date: elem.date,
            artist: elem.artist,
            place: elem.place,
            stock: elem.stock,
            category: elem.category,
        }
    }catch(error){
        console.log(error)
    }
}
if(detail){
    res.send(detail)
} else {
    res.status(404).send("ID not found")
}

}

module.exports = {
    createEvent,
    getEvents,
    getEventDetail,
    getEventsDetailDb,
    updateEvent
}