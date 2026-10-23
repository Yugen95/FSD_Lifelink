const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db/connect');

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'LifeLink backend is running' });
});

const donorRoutes = require('./routes/donors');
app.use('/api/donors', donorRoutes);

const bloodUnitRoutes = require('./routes/bloodUnits');
app.use('/api/blood-units', bloodUnitRoutes);

const emergencyRoutes = require('./routes/emergencyRequests');
app.use('/api/emergency-requests', emergencyRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});