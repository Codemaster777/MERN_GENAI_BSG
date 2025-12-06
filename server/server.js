require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    // Seed data if empty
  })
  .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export for testing