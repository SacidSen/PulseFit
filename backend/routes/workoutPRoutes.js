const express = require('express');
const router = express.Router();
const { getAllWorkouts, createWorkout,deleteWorkout,updateWorkout,saveWorkout} = require('../controllers/workoutPController');



// GET: Tüm workout'ları getir
router.get('/list', getAllWorkouts);

// POST: Yeni workout oluştur
router.post('/:id', createWorkout);

router.delete('/:id', deleteWorkout);

router.put('/:id', updateWorkout);

router.post('/save-workout', saveWorkout);

module.exports = router;
