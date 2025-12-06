const Recipe = require('../models/Recipe');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. Get Recipes with Filters
exports.getRecipes = async (req, res) => {
  try {
    const { search, cuisine, isVegetarian, maxTime } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } }
      ];
    }
    if (cuisine) query.cuisine = cuisine;
    if (isVegetarian) query.isVegetarian = isVegetarian === 'true';
    if (maxTime) query.prepTimeMinutes = { $lte: Number(maxTime) };

    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get Single Recipe
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Create Recipe (For seeding/testing)
exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 4. GenAI: Simplify Instructions or Suggest based on ingredients
exports.getAiAssistance = async (req, res) => {
  const { recipeId, type } = req.body; 
  // type: 'simplify' or 'suggest' (we will focus on simplify for this demo)

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    let prompt = "";
    if (type === 'simplify') {
      prompt = `Simplify the following cooking instructions into a short, easy-to-read summary for a beginner cook. Instructions: ${recipe.instructions}`;
    } else {
      prompt = `Explain why this recipe (${recipe.name}) is good for a ${recipe.cuisine} themed dinner.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ aiResponse: text });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "Failed to fetch AI response. Ensure API Key is valid." });
  }
};