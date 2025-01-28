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

    // add doc to db
    try{
        const event = await Event.create(req.body)
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.essage})

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

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
}