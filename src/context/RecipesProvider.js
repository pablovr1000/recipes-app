import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoods,
  getDrinks,
  getFoodByCategory,
  getDrinkByCategory, getRecommendations } from '../services/API';
import { chosenMealsCategories, chosenDrinksCategories } from '../utils/constants';
import recipesContext from './recipesContext';
import useLocalStorage from '../utils/hooks';

export default function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [userData, setUserData] = useLocalStorage('user', {});
  const [storageDoneRecipes, setStorageDoneRecipes] = useLocalStorage('doneRecipes', []);
  const [storageInProgressRecipes,
    setStorageInProgressRecipes] = useLocalStorage('inProgressRecipes', {});
  const [storageFavoriteRecipes,
    setStorageFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const [currentPage, setCurrentPage] = useState('');
  const [isSearchBarInputClicked, setIsSearchBarInputClicked] = useState(false);
  const [filterClicked, setFilterClicked] = useState('');
  const [foodsAndDrinksByFilter, setFoodsAndDrinksByFilter] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [isAllClicked, setIsAllClicked] = useState(false);

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
    } else {
      setFilterClicked('');
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
    getMealsAndDrinksByFilter,
    isSearchBarInputClicked,
    setIsSearchBarInputClicked,
    currentPage,
    setCurrentPage,
    foodsAndDrinksByFilter,
    allFoods,
    setAllFoods,
    isAllClicked,
    setIsAllClicked,
  };

  return (
    <recipesContext.Provider value={ values }>
      {children}
    </recipesContext.Provider>
  );
}
RecipesProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
