const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// get All Exercises
router.get('/:id', exerciseController.getAllExercises);

// create New Exercise
router.post('/', exerciseController.createExercise);

// update Exercise
router.put('/:id', exerciseController.updateExercise);

// delete Exercise
router.delete('/:id', exerciseController.deleteExercise);


module.exports = router;