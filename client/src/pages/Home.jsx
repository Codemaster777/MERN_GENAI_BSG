import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [isVegetarian, setIsVegetarian] = useState('');

  const fetchRecipes = async () => {
    try {
      const params = { search, cuisine, isVegetarian };
      // Remove empty keys
      Object.keys(params).forEach(key => params[key] === '' && delete params[key]);
      
      const res = await axios.get('http://localhost:5000/api/recipes', { params });
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [search, cuisine, isVegetarian]);

  return (
    <div className="container">
      <h1>Smart Recipe Explorer 🍳</h1>
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search ingredient or name..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
          <option value="">All Cuisines</option>
          <option value="Indian">Indian</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
        </select>
        <select value={isVegetarian} onChange={(e) => setIsVegetarian(e.target.value)}>
          <option value="">Any Type</option>
          <option value="true">Vegetarian</option>
          <option value="false">Non-Vegetarian</option>
        </select>
      </div>

      <div>
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
        {recipes.length === 0 && <p>No recipes found.</p>}
      </div>
    </div>
  );
};

export default Home;