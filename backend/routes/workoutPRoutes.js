const express = require('express');
const router = express.Router();
const { 
  getAllWorkouts, 
  createWorkout, 
  deleteWorkout, 
  updateWorkout 
} = require('../controllers/workoutPController');

// GET: Alle Workouts abrufen (Liste)
router.get('/list', getAllWorkouts);

// GET: Workouts des Benutzers abrufen
router.get('/:userId', getAllWorkouts);

// POST: Neues Workout erstellen
router.post('/:id', createWorkout);

// Workout löschen
router.delete('/:id', deleteWorkout);

// Workout aktualisieren
router.put('/:id', updateWorkout);

module.exports = router;
