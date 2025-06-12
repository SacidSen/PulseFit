const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// Tüm egzersizleri getir
router.get('/', exerciseController.getAllExercises);

// Yeni egzersiz oluştur
router.post('/', exerciseController.createExercise);

// Egzersizi güncelle
router.put('/:id', exerciseController.updateExercise);

// Egzersizi sil
router.delete('/:id', exerciseController.deleteExercise);


module.exports = router;
