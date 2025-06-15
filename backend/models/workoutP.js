const mongoose = require('mongoose');

// Workout modeli için şema tanımı
const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  exercises: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }],
    validate: {
      validator: function (arr) {
        return arr.length <= 10;
      },
      message: 'Maximal 10 Übungen erlaubt.'
    }
  }
});


module.exports = mongoose.model('workoutPlan', workoutSchema);