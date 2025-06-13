const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workoutPlan',
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('calendar', calendarEventSchema);