const express = require('express');
const {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventUsers,
    getAttendees,
    likeEvent,
    getAttendeeStats,
    exportEventData
} = require('../controllers/eventController');

const router = express.Router();

// specific routes
router.get('/:eventId/attendee-stats', getAttendeeStats);
router.get('/:eventId/export', exportEventData);
router.get('/attendees/:id', getAttendees);
router.patch('/like/:id', likeEvent);

// general routes
router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.delete('/:id', deleteEvent);
router.patch('/:id', updateEvent);
router.patch('/', updateEventUsers);

module.exports = router;
