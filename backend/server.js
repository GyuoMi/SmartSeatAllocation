require('dotenv').config();
const express = require('express');
const cors = require('cors');

// force db.js to load
require('./db');

const participantsRoutes = require('./routes/participants');
const sessionsRoutes = require('./routes/sessions');
const bookingsRoutes = require('./routes/bookings');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/participants', participantsRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/bookings', bookingsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Smart Seat Allocation API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});