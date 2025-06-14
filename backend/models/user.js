const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Bitte geben Sie einen Namen ein'],
    maxlength: 32
  },

  email: {
    type: String,
    trim: true,
    required: [true, 'Bitte geben Sie eine E-Mail-Adresse ein'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    ]
  },

  password: {
    type: String,
    trim: true,
    required: [true, 'Bitte geben Sie ein Passwort ein'],
    minlength: [6, 'Das Passwort muss mindestens 6 Zeichen lang sein'],
    match: [
      /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
      'Das Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen enthalten'
    ]
  }
});

// Passwort hashen vor dem Speichern
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Passwortvergleich bei der Anmeldung
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT-Token generieren
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,  // <-- Burada artık .env üzerinden okunmalı!
    { expiresIn: process.env.JWT_EXPIRE || '1h' }
  );
};

module.exports = mongoose.model('user', userSchema);
