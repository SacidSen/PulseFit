const express = require('express');
const router = express.Router();
const { getAllWorkouts, createWorkout,deleteWorkout,updateWorkout } = require('../controllers/workoutPController');

// GET: Tüm workout'ları getir
router.get('/list', getAllWorkouts);

// POST: Yeni workout oluştur
router.post('/:id', createWorkout);

router.delete('/:id', deleteWorkout);

router.put('/:id', updateWorkout);

module.exports = router;
