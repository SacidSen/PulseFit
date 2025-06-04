const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  exercises: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exercise'
    }],
    validate: {
      validator: function (arr) {
        return arr.length >= 1 && arr.length <= 10;
      },
      message: 'Bir workout en az 1 ve en fazla 10 egzersiz içermelidir.'
    }
  }
});

module.exports = mongoose.model('workoutPlan', workoutSchema);
