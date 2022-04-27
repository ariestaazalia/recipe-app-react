import React, {useEffect, useState} from 'react';
import Recipe from '../Recipe/Recipe';
import './App.css';
import { FaSearch } from "react-icons/fa";

const App = () => {
  const APP_ID = '37053fd5';
  const APP_KEY = '3eeebbc8bb2230a490ae232f6d7f1b4f';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('beef');

  const req = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(req);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const searchBox = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }
  
  return(
    <div>
      <form className='search-form' onSubmit={getSearch}>
        <input type='text' placeholder='Search...' className='search-input' value={search} onChange={searchBox} />
        <button className='search-button' type='submit'>
            <FaSearch />
        </button>
      </form>

      <div className='recipe'>
        {recipes.map(recipe => (
          <Recipe 
            key = {recipe.recipe.label}
            title = {recipe.recipe.label} 
            calories = {recipe.recipe.calories} 
            image = {recipe.recipe.image}
            ingredients = {recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
