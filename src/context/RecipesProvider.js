import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import recipesContext from './recipesContext';

import useLocalStorage from '../utils/hooks';
import { chosenMealsCategories, chosenDrinksCategories } from '../utils/constants';
import { getFoods,
  getDrinks,
  getFoodByCategory,
  getDrinkByCategory,
  getRecommendations } from '../services/API';

function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);
  const [isSearchBarInputClicked, setIsSearchBarInputClicked] = useState(false);
  const [filterClicked, setFilterClicked] = useState('');
  const [foodsAndDrinksByFilter, setFoodsAndDrinksByFilter] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [isAllClicked, setIsAllClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
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

  const renderingConditionals = (target) => {
    if (filterClicked === '' || filterClicked !== target.value) {
      setFilterClicked(target.value);
      setIsAllClicked(false);
      setIsSearchBarInputClicked(false);
    } else {
      setFilterClicked('');
      setIsAllClicked(false);
      setIsSearchBarInputClicked(false);
    }
  };

  const getMealsAndDrinksByFilter = async ({ target }) => {
    let data = [];
    if (chosenMealsCategories.includes(target.value)) {
      data = await getFoodByCategory(target.value);
    }
    if (chosenDrinksCategories.includes(target.value)) {
      data = await getDrinkByCategory(target.value);
    }
    setFoodsAndDrinksByFilter(data);
    renderingConditionals(target);
  };

  const allRenderingConditional = () => {
    if (isAllClicked) {
      setFilterClicked('');
      setIsSearchBarInputClicked(false);
    }
  };

  const getAllCategories = (allCategories) => {
    setAllFoods(allCategories);
    setIsAllClicked(true);
    setIsSearchBarInputClicked(false);
    setFilterClicked('');
    allRenderingConditional();
  };

  const values = {
    recipeResults,
    userData,
    setUserData,
    recommendations,
    setRecommendations,
    getRecipes,
    setCurrentPage,
    currentPage,
    isSearchBarInputClicked,
    setIsSearchBarInputClicked,
    getMealsAndDrinksByFilter,
    filterClicked,
    foodsAndDrinksByFilter,
    setFilterClicked,
    getAllCategories,
    allFoods,
    isAllClicked
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
