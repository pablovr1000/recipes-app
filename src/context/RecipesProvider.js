import React, { useState } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';
import { getFoods, getDrinks } from '../services/API';

function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);

  const getRecipes = async (page, search, option) => {
    let data = [];
    if (page === 'foods') data = await getFoods(search, option);
    if (page === 'drinks') data = await getDrinks(search, option);

    setRecipeResults(data);
  };

  return (
    <recipesContext.Provider value={ { recipeResults, getRecipes } }>
      {children}
    </recipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
