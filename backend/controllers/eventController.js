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
    return res.status(404).json({ error: "event not found" })
  }

  const event = await Event.findById(id)
  if (!event) {
    return res.status(404).json({ error: "event not found" })
  }

  res.status(200).json(event)
}

// create a new Event
const createEvent = async (req, res) => {
  try {
    console.log('req.body', req.body)
    const event = await Event.create(req.body) 
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "event not found" })
  }

  // ▼  Use Event (the Mongoose model), not event
  const event = await Event.findOneAndDelete({ _id: id })
  
  if (!event) {
    return res.status(404).json({ error: "event not found" })
  }

  res.status(200).json(event)
}

// update a event
const updateEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "event not found" })
  }

  // ▼  Use Event (the Mongoose model), not event
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated document
  )
  
  if (!updatedEvent) {
    return res.status(404).json({ error: "event not found" })
  }

  res.status(200).json(updatedEvent)
}

const updateEventUsers = async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { attendeeList: userId } },
      { new: true }
    )

    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAttendees = async (req, res) => {
  const { id } = req.params

  try {
    const event = await Event.findById(id)
    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    // event.attendeeList is presumably an array of user IDs
    res.status(200).json(event.attendeeList)
  } catch (error) {
    res.status(500).json({ error: error.message })
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
