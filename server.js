const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const empMasterAndRateRoutes = require('./routes/empMasterAndRateRoutes');
const mealFormRoutes = require('./routes/mealFormRoutes');
const mealRoute = require('./routes/mealRoute');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Use routes for both models
app.use('/api/empMasterAndRate', empMasterAndRateRoutes);
app.use('/api/mealForm', mealFormRoutes);
app.use('/api/', mealRoute);

// Export the app to be used by Vercel
module.exports = app; // Export the Express app to handle serverless requests
