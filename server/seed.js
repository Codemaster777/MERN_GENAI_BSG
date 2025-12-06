const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const sampleRecipes = [
  {
    name: "Paneer Butter Masala",
    cuisine: "Indian",
    isVegetarian: true,
    prepTimeMinutes: 40,
    ingredients: ["paneer", "tomato", "cream", "butter", "spices"],
    difficulty: "medium",
    instructions: "1. Fry spices. 2. Add tomato puree and cook. 3. Add cream and paneer. 4. Simmer for 10 mins.",
    tags: ["dinner", "rich"]
  },
  {
    name: "Spaghetti Aglio e Olio",
    cuisine: "Italian",
    isVegetarian: true,
    prepTimeMinutes: 20,
    ingredients: ["spaghetti", "garlic", "olive oil", "chili flakes", "parsley"],
    difficulty: "easy",
    instructions: "1. Boil pasta. 2. Sauté garlic in olive oil. 3. Mix pasta with oil. 4. Garnish with parsley.",
    tags: ["quick", "lunch"]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Recipe.deleteMany({});
    await Recipe.insertMany(sampleRecipes);
    console.log("Data Seeded!");
    process.exit();
  })
  .catch(err => console.log(err));