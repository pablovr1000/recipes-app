import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';
import { getFoods, getDrinks, getRecommendations } from '../services/API';
import useLocalStorage from '../utils/hooks';

function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [userData, setUserData] = useLocalStorage('user', {});
  const [storageDoneRecipes, setStorageDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [storageInProgressRecipes,
    setStorageInProgressRecipes] = useLocalStorage('inProgressRecipes', {});
  const [storageFavoriteRecipes,
    setStorageFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);

  useEffect(() => {
    (async () => {
      const recommendationsResults = await getRecommendations();
      setRecommendations(recommendationsResults);
    })();
  }, []);

  const getRecipes = async (page, search, option) => {
    let data = [];
    if (page === 'foods') data = await getFoods(search, option);
    if (page === 'drinks') data = await getDrinks(search, option);

    setRecipeResults(data);
  };

  const values = {
    recipeResults,
    userData,
    setUserData,
    getRecipes,
    recommendations,
    setRecommendations,
    storageDoneRecipes,
    setStorageDoneRecipes,
    storageInProgressRecipes,
    setStorageInProgressRecipes,
    storageFavoriteRecipes,
    setStorageFavoriteRecipes,
  };

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
