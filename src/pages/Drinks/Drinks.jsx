import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../../context/recipesContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RECIPES_RENDER_QUANTITY,
  chosenDrinksCategories,
}
from '../../utils/constants';
import Header from '../../components/Header/Header';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import DrinksCardsFromFilter from
'../../components/FoodCardsFromFilter/DrinksCardsFromFilter';

export default function Drinks() {
  const { recipeResults,
    isSearchBarInputClicked,
    setIsSearchBarInputClicked,
    filterClicked,
    foodsAndDrinksByFilter,
    getMealsAndDrinksByFilter,
  } = useContext(recipesContext);

  const [recipesToRender, setRecipesToRender] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);

  useEffect(() => {
    const getDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      setDrinksArray(Object.values(drinks).splice(0, RECIPES_RENDER_QUANTITY));
      setIsSearchBarInputClicked(false);
    };
    getDrinks();
  }, [setIsSearchBarInputClicked]);

  useEffect(() => {
    if (recipeResults?.length > 1) {
      setRecipesToRender(recipeResults.slice(0, RECIPES_RENDER_QUANTITY));
    }
  }, [recipeResults]);

  return (
    <>
      <Header />
      {
        chosenDrinksCategories.map((category) => (
          <FilterButtons
            fetchFunction={ getMealsAndDrinksByFilter }
            key={ category }
            stgName={ category }
          />
        ))
      }
      {
        filterClicked && (
          foodsAndDrinksByFilter.map(({ strDrink, idDrink, strDrinkThumb }, index) => (
            <DrinksCardsFromFilter
              drinkId={ index }
              key={ idDrink }
              drinKname={ strDrink }
              drinkLink={ strDrinkThumb }
            />
          ))
        )
      }
      { !filterClicked && (
        recipesToRender.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <RecipeCard
            key={ idDrink }
            recipeName={ strDrink }
            recipeImg={ strDrinkThumb }
            recipeIndex={ index }
          />))) }
      {
        !isSearchBarInputClicked && (
          drinksArray.map((el, index) => (
            <RecipeCard
              key={ el.idDrink }
              recipeName={ el.strDrink }
              recipeImg={ el.strDrinkThumb }
              recipeIndex={ index }
            />))
        )
      }
    </>
  );
}
