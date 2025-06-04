const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
name: {
       type: String,
       trim: true,
       required : [true, 'Please add a Name'],
       maxlength: 32
   },

email: {
    type: String,
    trim: true,
    required : [true, 'Please add a E-mail'],
    unique: true,
    match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid E-mail'
    ]

},

password: {
    type: String,
    trim: true,
    required : [true, 'Please add a Password'],
    minlength: [6, 'password must have at least six(6) characters'],
    match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
    ]
}
});


// get the token
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    'senin_jwt_secret_keyin', // bu secret .env dosyasına taşınmalı
    { expiresIn: '1h' } // Token 1 saat geçerli
  );
};

module.exports = mongoose.model('User', userSchema);
