const mongoose = require('mongoose');

// Workout modeli için şema tanımı
const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  exercises: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    }],
    validate: {
      validator: function (arr) {
        return arr.length >= 1 && arr.length <= 10;
      },
      message: 'Bir workout en az 1 ve en fazla 10 egzersiz içermelidir.'
    }
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
