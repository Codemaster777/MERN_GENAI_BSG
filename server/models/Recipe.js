const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  isVegetarian: { type: Boolean, default: true },
  prepTimeMinutes: { type: Number, required: true },
  ingredients: [{ type: String }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  instructions: { type: String, required: true },
  tags: [{ type: String }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);