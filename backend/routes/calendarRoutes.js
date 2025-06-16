const express = require('express');
const router = express.Router();
const {
  createCalendarEvent,
  getUserCalendarEvents,
  deleteCalendarEvent
} = require('../controllers/calendarController');

// create Calendar Event
router.post('/', createCalendarEvent);

// get User Calendar Events
router.get('/', getUserCalendarEvents);

// delete Calendar Event
router.delete('/:id', deleteCalendarEvent);

module.exports = router;