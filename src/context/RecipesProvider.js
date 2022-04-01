import React, { useState } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';
import { getFoods, getDrinks } from '../services/API';

function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);
  const [recommendations, setRecommendations] = useState({});

  const getRecipes = async (page, search, option) => {
    let data = [];
    if (page === 'foods') data = await getFoods(search, option);
    if (page === 'drinks') data = await getDrinks(search, option);

    setRecipeResults(data);
  };

  const values = { recipeResults, getRecipes, recommendations, setRecommendations };
  return (
    <recipesContext.Provider value={ values }>
      {children}
    </recipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
