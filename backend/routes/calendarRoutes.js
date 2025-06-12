const express = require('express');
const router = express.Router();
const {
  createCalendarEvent,
  getUserCalendarEvents,
  deleteCalendarEvent
} = require('../controllers/calendarController');

// Event oluşturma
router.post('/', createCalendarEvent);

// Kullanıcının eventlerini getir
router.get('/', getUserCalendarEvents);

// Event silme
router.delete('/:id', deleteCalendarEvent);

module.exports = router;
