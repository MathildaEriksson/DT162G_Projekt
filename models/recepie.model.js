const mongoose = require('mongoose');

const recepieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5, 
  },
  category: {
    type: String,
    required: true
  },
  ingredients: [
    {
      name: String,
      amount: Number,
      unit: String
    }
  ], 
  instructions: {
    type: String,
    required: true,
  }, 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Recepie = mongoose.model('Recepie', recepieSchema);

module.exports = Recepie;