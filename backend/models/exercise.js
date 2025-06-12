const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  force: {
    type: String,
    enum: ['push', 'pull', 'static'],
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  mechanic: {
    type: String,
    enum: ['compound', 'isolation'],
    required: true
  },
  equipment: {
    type: String,
    required: true
  },
  primaryMuscles: {
    type: [String],
    required: true
  },
  secondaryMuscles: {
    type: [String],
    default: []
  },
  instructions: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    enum: ['stretching', 'plyometrics', 'strongman', 'strength'],
    required: true
  }
});

module.exports = mongoose.model('exercise', exerciseSchema);
