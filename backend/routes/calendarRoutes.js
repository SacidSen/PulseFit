const express = require('express');
const router = express.Router();
const {
  createCalendarEvent,
  getUserCalendarEvents,
  deleteCalendarEvent
} = require('../controllers/calendarController');

// Kalenderereignis erstellen
router.post('/', createCalendarEvent);

// Kalenderereignisse des Benutzers abrufen
router.get('/', getUserCalendarEvents);

// Kalenderereignis löschen
router.delete('/:id', deleteCalendarEvent);

module.exports = router;
