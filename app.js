const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Anslut till MongoDB
mongoose.connect('mongodb://localhost/recepieVaultDB')
  .then(() => console.log('Ansluten till MongoDB.'))
  .catch(err => console.error('Kunde inte ansluta till MongoDB.', err));

// Aktivera CORS
//app.use(cors());

// Middleware för att parsa JSON
app.use(express.json());

// Importera routes
const recepiesRoutes = require('./routes/recepies');

// Använd routes
app.use('/recepies', recepiesRoutes);

// Starta server
app.listen(port, () => {
  console.log(`Servern är igång på http://localhost:${port}`);
});
