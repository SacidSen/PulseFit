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
      message: 'Max 10 egzersiz eklenebilir.'
    }
  },
  startDate: {
    type: Date,
    required: false
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return !this.startDate || value >= this.startDate;
      },
      message: 'Bitiş tarihi başlangıç tarihinden önce olamaz.'
    }
  }
});


module.exports = mongoose.model('workoutPlan', workoutSchema);
