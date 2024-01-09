//Mathilda Eriksson, DT162G, HT23

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipeVaultDB')
  .then(() => console.log('Ansluten till MongoDB.'))
  .catch(err => console.error('Kunde inte ansluta till MongoDB.', err));

// Activate CORS
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Middleware to serve uploaded images
app.use('/uploads', express.static('uploads'));

// Import routes
const recipesRoutes = require('./routes/recipes');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/recipes', recipesRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Servern är igång på http://localhost:${port}`);
});