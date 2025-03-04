const Event = require('../models/EventModel')
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({createdAt: -1})
    res.status(200).json(events)
}

// get a single Event
const getEvent = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "event not found"})
    }
    const event = await Event.findById(id)
    if (!event) {
        return res.status(404).json({error: "event not found"})
    }
    res.status(200).json(event)
}

// create a new Event
const createEvent = async (req, res) => {
    // const {name, time, date, location, attendeeList, eventDescription, hostDescription, XP, pictures, admin} = req.body

    // add doc to db
    console.log("create an event");
    try{
        // const event = await Event.create({name, time, date, location, attendeeList, eventDescription, hostDescription, XP, pictures, admin})
        console.log('req.body', req.body)
        const event = await Event.create(req.body)
        console.log('did')
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a event
const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "event not found"})
    }
    const event = await event.findOneAndDelete({_id: id})
    
    if (!event) {
        return res.status(404).json({error: "event not found"})
    }
    res.status(200).json(event)

}

// update a event
const updateEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "event not found"})
    }
    const event = await event.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!event) {
        return res.status(404).json({error: "event not found"})
    }
    res.status(200).json(event)
}

const updateEventUsers = async (req, res) => {
    const { eventId, userId } = req.body;
    console.log(eventId, userId);
    try {
        console.log('updating events')
        const event = await Event.findByIdAndUpdate(
            eventId,
            { $addToSet: { attendeeList: userId } },
            { new: true }
        )

        if (!event) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAttendees = async (req, res) => {
    const { id } = req.params

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        const count = event.attendeeList;
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventUsers,
    getAttendees
}