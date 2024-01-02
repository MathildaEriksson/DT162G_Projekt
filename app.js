const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recepieVaultDB')
  .then(() => console.log('Ansluten till MongoDB.'))
  .catch(err => console.error('Kunde inte ansluta till MongoDB.', err));

// Activate CORS
//app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Import routes
const recepiesRoutes = require('./routes/recepies');

// Use routes
app.use('/recepies', recepiesRoutes);

// Start server
app.listen(port, () => {
  console.log(`Servern är igång på http://localhost:${port}`);
});
