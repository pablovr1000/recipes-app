import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';
import { getFoods, getDrinks, getRecommendations } from '../services/API';
import { x } from '../utils/constants';

function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);
  const [recommendations, setRecommendations] = useState(x);

  useEffect(() => {
    (async () => {
      const recommendationsResults = await getRecommendations();
      console.log(recommendationsResults);
      // setRecommendations(recommendationsResults);
    })();
  }, []);

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
