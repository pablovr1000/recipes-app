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
  const [filterClicked, setFilterClicked] = useState('');
  const [foodsAndDrinksByFilter, setFoodsAndDrinksByFilter] = useState([]);

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
          filterClicked,
          foodsAndDrinksByFilter,
          setFilterClicked }
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
