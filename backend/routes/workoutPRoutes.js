const express = require('express');
const router = express.Router();
const { getAllWorkouts, createWorkout,deleteWorkout,updateWorkout,saveWorkout} = require('../controllers/workoutPController');



// get All Workouts
router.get('/list', getAllWorkouts);

// get All Workouts by User ID
router.get('/:userId', getAllWorkouts);

// post New Workout
router.post('/:id', createWorkout);
// delete Workout
router.delete('/:id', deleteWorkout);
// save Workout
router.put('/:id', updateWorkout);

module.exports = router;