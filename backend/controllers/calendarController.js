const CalendarEvent = require('../models/Calendar');

// Alle Kalenderereignisse des Benutzers abrufen
exports.getUserCalendarEvents = async (req, res) => {
  try {
    const { userId, workoutId } = req.query;
    
    if (!userId && !workoutId) {
      return res.status(400).json({ message: 'userId oder workoutId erforderlich' });
    }

    const filter = {};
    if (userId) filter.userId = userId;
    if (workoutId) filter.workoutId = workoutId;

    const events = await CalendarEvent.find(filter).populate('workoutId');
    res.status(200).json(events);
  } catch (error) {
    console.error('FEHLER:', error);
    res.status(500).json({ message: 'Ereignisse konnten nicht abgerufen werden' });
  }
};

// Neues Kalenderereignis erstellen
exports.createCalendarEvent = async (req, res) => {
  try {
    const { userId, workoutId, start, end } = req.body;

    if (!userId || !workoutId || !start || !end) {
      return res.status(400).json({ message: 'Fehlende Angaben' });
    }

    const event = await CalendarEvent.create({
      userId,
      workoutId,
      start,
      end,
    });

    res.status(201).json({
      _id: event._id,
      workoutId: event.workoutId,
      start: event.start,
      end: event.end,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Kalenderereignis konnte nicht gespeichert werden' });
  }
};

// Kalenderereignis löschen
exports.deleteCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await CalendarEvent.findByIdAndDelete(id);
    res.status(200).json({ message: 'Ereignis wurde gelöscht' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ereignis konnte nicht gelöscht werden' });
  }
};
