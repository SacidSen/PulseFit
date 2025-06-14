const User = require('../models/user');
const getCurrentUser = require('../service/user');
const jwt = require('jsonwebtoken');

// Token generieren
const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRE)),
    httpOnly: true
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
};

// Benutzer registrieren
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Diese E-Mail ist bereits registriert' });
    }

    const newUser = new User({ name: name || '', email, password });
    await newUser.save();

    res.status(201).json({ message: 'Benutzer erfolgreich erstellt' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Serverfehler' });
  }
};

// Benutzer einloggen
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Falsches Passwort' });
    }

    await generateToken(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Serverfehler' });
  }
};

// Benutzer ausloggen
const logoutUser = async (req, res) => {  
  res.clearCookie('');
  res.status(200).json({
    success: true,
    message: 'Erfolgreich abgemeldet'
  });
};

// Aktuellen Benutzer abrufen
const getMe = async (req, res) => {
  try {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token nicht gefunden' });
    }

    const user = await getCurrentUser(token);

    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const options = {
      expires: new Date(Date.now() + Number(process.env.JWT_EXPIRE)),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie('token', newToken, options)
      .json({
        success: true,
        token: newToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message || 'Nicht autorisiert' });
  }
};

module.exports = {
  register: registerUser,
  login: loginUser,
  logout: logoutUser,
  getMe: getMe
};
