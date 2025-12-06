const express = require('express');
const router = express.Router();
const controller = require('../controllers/recipeController');

router.get('/', controller.getRecipes);
router.post('/', controller.createRecipe);
router.get('/:id', controller.getRecipeById);
router.post('/ai-assist', controller.getAiAssistance);

module.exports = router;