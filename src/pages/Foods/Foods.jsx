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
    filterClicked,
    foodsAndDrinksByFilter,
    getMealsAndDrinksByFilter,
  } = useContext(recipesContext);
  const [foodsToRender, setFoodsToRender] = useState([]);
  const [mealsArray, setMealsArray] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const { meals } = await response.json();
      setMealsArray(Object.values(meals).splice(0, RECIPES_RENDER_QUANTITY));
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
      <section>
        {
          chosenMealsCategories.map((category) => ( // botões
            <FilterButtons
              key={ category }
              stgName={ category }
              fetchFunction={ getMealsAndDrinksByFilter }
            />
          ))
        }
      </section>
      {
        filterClicked && (
          foodsAndDrinksByFilter.map(({ strMeal, idMeal, strMealThumb }, index) => ( // array que vem do clique do filtro
            <FoodCardsFromFilter
              mealId={ index }
              key={ idMeal }
              mealName={ strMeal }
              imageLink={ strMealThumb }
            />
          ))
        )
      }
      {
        isSearchBarInputClicked && (
          foodsToRender.map(({ idMeal, strMeal, strMealThumb }, index) => ( // array que vem da search bar
            <RecipeCard
              key={ idMeal }
              recipeName={ strMeal }
              recipeImg={ strMealThumb }
              recipeIndex={ index }
            />)))
      }
      {
        (!filterClicked && !isSearchBarInputClicked) && (
          mealsArray.map(({ strMeal, strMealThumb }, index) => ( // array padrão
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
