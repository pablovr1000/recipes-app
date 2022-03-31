import React, { useState } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';
import { getFoods,
  getDrinks,
  getFoodByCategory,
  getDrinkByCategory } from '../services/API';
import { chosenMealsCategories, chosenDrinksCategories } from '../utils/constants';

function RecipesProvider({ children }) {
  const [recipeResults, setRecipeResults] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [isSearchBarInputClicked, setIsSearchBarInputClicked] = useState(false);
  const [isAnyFilterClicked, setIsAnyFilterClicked] = useState(false);
  const [secondConditionToRender, setSecondConditionToRender] = useState(false);
  const [foodsAndDrinksByFilter, setFoodsAndDrinksByFilter] = useState([]);

  const getRecipes = async (page, search, option) => {
    let data = [];
    if (page === 'foods') data = await getFoods(search, option);
    if (page === 'drinks') data = await getDrinks(search, option);

    setRecipeResults(data);
  };

  const getMealsAndDrinksByFilter = async (filter) => {
    let data = [];
    if (chosenMealsCategories.includes(filter)) data = await getFoodByCategory(filter);
    if (chosenDrinksCategories.includes(filter)) data = await getDrinkByCategory(filter);
    setFoodsAndDrinksByFilter(data);
    setIsAnyFilterClicked((prevState) => (!prevState));
  };

  return (
    <recipesContext.Provider
      value={
        { recipeResults,
          getRecipes,
          setCurrentPage,
          currentPage,
          isSearchBarInputClicked,
          setIsSearchBarInputClicked,
          getMealsAndDrinksByFilter,
          secondConditionToRender,
          isAnyFilterClicked,
          foodsAndDrinksByFilter,
          setSecondConditionToRender }
      }
    >
      {children}
    </recipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
