import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAiAssist = async () => {
    setLoadingAi(true);
    setAiResponse('');
    try {
      const res = await axios.post('http://localhost:5000/api/recipes/ai-assist', {
        recipeId: id,
        type: 'simplify'
      });
      setAiResponse(res.data.aiResponse);
    } catch (err) {
      setAiResponse('Error fetching AI insights.');
    } finally {
      setLoadingAi(false);
    }
  };

  if (!recipe) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <Link to="/">← Back to List</Link>
      <h1>{recipe.name}</h1>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      
      <h3>Instructions:</h3>
      <p style={{whiteSpace: 'pre-line'}}>{recipe.instructions}</p>

      <hr />
      
      <h3>✨ AI Assistant</h3>
      <p>Is this recipe too complex? Ask AI to simplify it!</p>
      <button onClick={handleAiAssist} disabled={loadingAi}>
        {loadingAi ? 'Thinking...' : 'Simplify Instructions with AI'}
      </button>

      {aiResponse && (
        <div className="ai-box">
          <h4>AI Summary:</h4>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;