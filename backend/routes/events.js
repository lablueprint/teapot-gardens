const express = require('express')
const {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventUsers,
    getAttendees,
    getAttendeeStats
} = require('../controllers/eventController')

const Event = require('../models/EventModel')

const router = express.Router()

router.get("/:eventId/attendee-stats", getAttendeeStats);

router.get('/', getEvents)

router.get('/:id', getEvent)

router.post('/', createEvent)

router.delete('/:id', deleteEvent)

router.patch('/:id', updateEvent)

router.patch('/', updateEventUsers)

router.get('/attendees/:id', getAttendees)

module.exports = router