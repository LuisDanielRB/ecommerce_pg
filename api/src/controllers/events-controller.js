const { EventsCreated, Event, Users } = require("../db");
const fs = require("fs");
const uploadImage = require("../helpers/cloudinary");
const fsExtra = require("fs-extra");

const createEvent = async (req, res) => {
  const { description, price, date, artist, place, stock, category, userId } =
    req.body;

  var result;
  try {

    if (req.files?.image) {
      result = await uploadImage(req.files.image.tempFilePath);
      await fsExtra.unlink(req.files.image.tempFilePath);
    }
    const newEvent = await EventsCreated.create({
      description,
      price,
      date,
      artist,
      place,
      stock,
      category,
      image: result ? result.secure_url : "undefined",
      imageId: result ? result.public_id : "undefined"
    });
    newEvent.setUser(userId);
    res.json({
      eventsCreated: newEvent,
    });
  } catch (error) {
    console.log(error);
  }
};
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

const deleteEvents = async (req, res) => {
  const { id } = req.params;

  if (id.includes("-")) {
    try {
      let deleteEvent = await Event.update(
        { isActive: false },
        {
          where: {
            id: id,
          },
        }
      );
      if (deleteEvent[0] === 0) {
        return res.status(404).send("Event not found");
      }

      console.log(deleteEvent);
      res.status(200).send("The event was removed successfully");
    } catch (error) {
      console.log(error);
      res.status(404).send("Event not found");
    }
  } else {
    try {
      let response = await EventsCreated.update(
        { isActive: false },
        {
          where: {
            id: id,
          },
        }
      );
      if (response[0] === 0) {
        return res.status(404).send("Event not found");
      }
      console.log(response);
      res.status(200).send("The event was removed successfully");
    } catch (error) {
      console.log(error);
      res.status(404).send("Event not found");
    }
  }
};

const getEvents = async (req, res) => {
  const allEvents = await Event.findAll();
  const data = JSON.parse(fs.readFileSync("dataBase.json", "utf8"));

  if (allEvents.length === 0) {
    const events = await Event.bulkCreate(data);
    res.json(events);
  } else {
    res.json(allEvents);
  }
};

const getEventDetail = async (req, res, next) => {
  const { id } = req.params;
  let detail;

  if (id.includes("-")) {
    try {
      detail = await Event.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await EventsCreated.findOne({
        where: {
          id: id,
        },
      });
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
        isActive: elem.isActive,
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("ID not found");
  }
};

const getEventsDetailDb = async (req, res) => {
  const { id } = req.params;
  let detail;

  if (id.includes("-")) {
    try {
      detail = await Event.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const response = await Event.findOne({
        where: {
          id: id,
        },
      });
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
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("ID not found");
  }
};

const getEventsForUsers = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const allEventsCreated = await EventsCreated.findAll({
      where: {
        userId: id,
      },
    });
    res.json(allEventsCreated);
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventDetail,
  getEventsDetailDb,
  deleteEvents,
  getEventsForUsers,
  updateEvent
};
