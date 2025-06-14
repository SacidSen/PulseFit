const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getCurrentUser = async (token) => {
  try {
    if (!token) {
      throw new Error('Token erforderlich');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // .env'den secret okunuyor

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('Benutzer nicht gefunden');
    }

    return user;
  } catch (error) {
    console.error('getCurrentUser Fehler:', error.message);
    throw new Error('Ungültiger Token oder Benutzer nicht gefunden');
  }
};

module.exports = getCurrentUser;
