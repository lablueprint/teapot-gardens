const express = require('express')
const {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent
} = require('../controllers/eventController')

const Event = require('../models/EventModel')

const router = express.Router()

router.get('/', getEvents)

router.get('/:id', getEvent)

router.post('/', createEvent)

router.delete('/:id', deleteEvent)

router.patch('/:id', updateEvent)

module.exports = router