require('dotenv').config(); // .env file loading

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');
    app.use(cors());
    origin: 'http://localhost:5173/'

// --- MIDDLEWARE ---
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());          // JSON body parser
app.use(cookieParser());         // Cookie parser middleware

// --- ROUTES ---
const calendarRoutes = require('./routes/calendarRoutes');
const userRoutes = require('./routes/userRoutes');
const workoutPRoutes = require('./routes/workoutPRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

// --- TEMEL ROUTE ---
app.get('/', (req, res) => {
  res.send('Merhaba, API çalışıyor!');
});

// --- API ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/workoutP', workoutPRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/calendar', calendarRoutes);

// --- Error Handler ---
app.use(errorHandler);

// --- Database Connection ---
const dbURI = process.env.DATABASE;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB-Verbindung erfolgreich'))
  .catch(err => console.error('MongoDB-Verbindungsfehler:', err));

// --- SERVER Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
