const jwt = require('jsonwebtoken');
const User = require('../models/user');
// get current user from token
const getCurrentUser = async (token) => {
  try {
    if (!token) {
      throw new Error('Token gerekli');
    }

    const decoded = jwt.verify(token, "senin_jwt_secret_keyin");

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    return user;
  } catch (error) {
    console.error('getCurrentUser error:', error.message);
    throw new Error('Geçersiz token veya kullanıcı bulunamadı');
  }
};

module.exports = getCurrentUser;