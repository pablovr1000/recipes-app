import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../../context/recipesContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RECIPES_RENDER_QUANTITY,
  chosenMealsCategories,
} from '../../utils/constants';
import Header from '../../components/Header/Header';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import FoodCardsFromFilter from
'../../components/FoodCardsFromFilter/FoodCardsFromFilter';

export default function Foods() {
  const { recipeResults,
    isSearchBarInputClicked,
    setIsSearchBarInputClicked,
    isAnyFilterClicked,
    foodsAndDrinksByFilter,
    getMealsAndDrinksByFilter,
    secondConditionToRender,
  } = useContext(recipesContext);
  const [foodsToRender, setFoodsToRender] = useState([]);
  const [mealsArray, setMealsArray] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      setMealsArray(Object.values(meals).splice(0, RECIPES_RENDER_QUANTITY));
      setIsSearchBarInputClicked(false);
    };
    getFoods();
  }, [setIsSearchBarInputClicked]);

  useEffect(() => {
    if (recipeResults?.length > 1) {
      setFoodsToRender(recipeResults.slice(0, RECIPES_RENDER_QUANTITY));
    }
  }, [recipeResults]);

  return (
    <>
      <Header />
      {
        chosenMealsCategories.map((category) => (
          <FilterButtons
            key={ category }
            stgName={ category }
            fetchFunction={ getMealsAndDrinksByFilter }
          />
        ))
      }
      <h1>Foods</h1>
      {
        isAnyFilterClicked && (
          foodsAndDrinksByFilter.map(({ strMeal, idMeal, strMealThumb }, index) => (
            <FoodCardsFromFilter
              mealId={ index }
              key={ idMeal }
              mealName={ strMeal }
              imageLink={ strMealThumb }
            />
          ))
        )
      }
      { foodsToRender.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <RecipeCard
          key={ idMeal }
          recipeName={ strMeal }
          recipeImg={ strMealThumb }
          recipeIndex={ index }
        />)) }
      {
        !isSearchBarInputClicked && !secondConditionToRender && (
          mealsArray.map(({ strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={ strMeal }
              recipeName={ strMeal }
              recipeImg={ strMealThumb }
              recipeIndex={ index }
            />))
        )
      }
    </>
  );
}
