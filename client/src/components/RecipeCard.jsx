import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card">
      <h3>{recipe.name}</h3>
      <p><strong>Cuisine:</strong> {recipe.cuisine} | <strong>Time:</strong> {recipe.prepTimeMinutes} mins</p>
      <p>
        {recipe.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </p>
      <Link to={`/recipe/${recipe._id}`}>
        <button style={{marginTop: '10px'}}>View Details</button>
      </Link>
    </div>
  );
};

export default RecipeCard;