import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../../context/recipesContext';

import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import Footer from '../../components/Footer/Footer';
import AllCategoriesButton
from '../../components/AllCategoriesButton/AllCategoriesButton';

import { RECIPES_RENDER_QUANTITY,
  chosenMealsCategories,
} from '../../utils/constants';

export default function Foods() {
  const { recipeResults,
    isSearchBarInputClicked,
    setIsSearchBarInputClicked,
    filterClicked,
    foodsAndDrinksByFilter,
    getMealsAndDrinksByFilter,
    getAllCategories,
    isAllClicked,
    allFoods,
  } = useContext(recipesContext);

  const [foodsToRender, setFoodsToRender] = useState([]);
  const [mealsArray, setMealsArray] = useState([]);
  const [renderFoodCard, setRenderFoodCard] = useState([]);

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

  useEffect(() => {
    if (isAllClicked) setRenderFoodCard(allFoods);
    if (filterClicked) setRenderFoodCard(foodsAndDrinksByFilter);
    if (isSearchBarInputClicked) setRenderFoodCard(foodsToRender);
    if (!filterClicked
      && !isSearchBarInputClicked
      && !isAllClicked) setRenderFoodCard(mealsArray);
  }, [isAllClicked,
    filterClicked,
    allFoods,
    foodsAndDrinksByFilter,
    renderFoodCard,
    foodsToRender,
    isSearchBarInputClicked,
    mealsArray]);

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
        <AllCategoriesButton // botão All
          categories={ mealsArray }
          fetchFunction={ getAllCategories }
        />
      </section>
      <main>
        {
          renderFoodCard.map(({ strMeal, idMeal, strMealThumb }, index) => (
            <RecipeCard
              recipeIndex={ index }
              key={ idMeal }
              recipeName={ strMeal }
              recipeImg={ strMealThumb }
              recipeId={ idMeal }
              page="foods"
            />
          ))
        }
      </main>
      <Footer />
    </>
  );
}
