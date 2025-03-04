const express = require('express')
const {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventUsers,
    getAttendees,
    likeEvent
} = require('../controllers/eventController')

const Event = require('../models/EventModel')

const router = express.Router()

router.get('/', getEvents)

router.get('/:id', getEvent)

router.post('/', createEvent)

router.delete('/:id', deleteEvent)

router.patch('/:id', updateEvent)

router.patch('/', updateEventUsers)

router.get('/attendees/:id', getAttendees)

router.patch('/like/:id', likeEvent)

module.exports = router