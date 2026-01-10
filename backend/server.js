require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const ngoRoutes = require('./routes/ngo');
const eventHostRoutes = require('./routes/eventHost');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ngo', ngoRoutes);
app.use('/api/eventhost', eventHostRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});