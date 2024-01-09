//Mathilda Eriksson, DT162G, HT23
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5, 
  },
  category: {
    type: String,
    required: true, 
    enum: ['Dessert', 'Huvudrätt', 'Förrätt', 'Sallad', 'Annat']
  },
  ingredients: [
    {
      name: String,
      amount: Number,
      unit: String
    }
  ], 
  instructions: [String], // Array of strings for step by step instructions
  image: String, // URL to recipe image
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;