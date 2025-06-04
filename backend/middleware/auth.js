// middleware/auth.js
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === 'gecerli-token') {
    next(); // her şey yolundaysa bir sonrakine geç
  } else {
    res.status(401).json({ error: 'Yetkisiz' });
  }
};
