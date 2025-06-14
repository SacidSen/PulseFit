const Workout = require('../models/workoutP');
const CalendarEvent = require('../models/Calendar');

// Neues Workout erstellen
exports.createWorkout = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: 'Benutzer-ID erforderlich' });
    }

    const { name } = req.body;

    // Groß- und Kleinschreibung ignorieren bei Namensprüfung
    const existingWorkout = await Workout.findOne({
      user: userId,
      name: { $regex: new RegExp('^' + name + '$', 'i') }
    });

    if (existingWorkout) {
      return res.status(400).json({ message: 'Ein Workout mit diesem Namen existiert bereits!' });
    }

    const workoutData = {
      ...req.body,
      user: userId
    };

    const workout = new Workout(workoutData);
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout konnte nicht erstellt werden' });
  }
};

// Workout löschen
exports.deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Workout wurde nicht gefunden' });
    }

    // Alle zugehörigen Kalendereinträge löschen
    await CalendarEvent.deleteMany({ workoutId: req.params.id });

    res.status(200).json({ message: 'Workout und zugehörige Kalendereinträge wurden gelöscht' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout konnte nicht gelöscht werden' });
  }
};

// Workout aktualisieren
exports.updateWorkout = async (req, res) => {
  const workoutId = req.params.id;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout wurde nicht gefunden' });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workout konnte nicht aktualisiert werden' });
  }
};

// Alle Workouts abrufen
exports.getAllWorkouts = async (req, res) => {
  try {
    const userId = req.query.userId;

    const filter = {};
    if (userId) {
      filter.user = userId;
    }

    const workouts = await Workout.find(filter).populate('exercises');
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Workouts konnten nicht abgerufen werden' });
  }
};
