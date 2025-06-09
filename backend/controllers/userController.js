const User = require('../models/user');
const getCurrentUser = require('../service/user');
const jwt = require('jsonwebtoken');

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

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email ve password zorunlu' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
    }

    const newUser = new User({ name: name || '', email, password });
    await newUser.save();

    res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Şifre yanlış' });
    }

    await generateToken(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
const logoutUser = async(req,res) => {  
  res.clearCookie('');
  res.status(200).json({
    success: true,
    message: 'Başarıyla çıkış yapıldı'
  });
  
};


const getMe = async (req, res) => {
  try {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token bulunamadı' });
    }

    const user = await getCurrentUser(token);

    // Optional: re-sign the token if you want to refresh the cookie
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
    res.status(401).json({ success: false, message: error.message || 'Yetkisiz' });
  }
};


module.exports = {
  register: registerUser,
  login: loginUser,
  logout : logoutUser,
  getMe: getMe
};