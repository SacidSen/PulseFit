const Exercise = require('../models/exercise');

// Alle Übungen abrufen
exports.getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: 'Egzersizler alınamadı' });
  }
};

// Neue Übung erstellen
exports.createExercise = async (req, res) => {
  try {
    const newExercise = await Exercise.create(req.body);
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ error: 'Egzersiz oluşturulamadı' });
  }
};
// exercise Update
exports.updateExercise = async (req, res) => {
  try {
    const updated = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Egzersiz bulunamadı' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Güncelleme hatası:', error);
    res.status(500).json({ error: 'Güncelleme başarısız' });
  }
};

// Exercise loeschen
exports.deleteExercise = async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Egzersiz silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Egzersiz silinemedi' });
  }
};