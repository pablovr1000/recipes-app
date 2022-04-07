import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../../context/recipesContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RECIPES_RENDER_QUANTITY,
  chosenMealsCategories,
} from '../../utils/constants';
import Header from '../../components/Header/Header';
<<<<<<< HEAD
import Footer from '../../components/Footer/Footer';
=======
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import AllCategoriesButton
from '../../components/AllCategoriesButton/AllCategoriesButton';
>>>>>>> 4fb4bc0abe6ae4ec3e4f5a6d0d61653685e5187a

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
<<<<<<< HEAD
      <h1>Foods</h1>
      { foodsToRender.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <RecipeCard
          key={ idMeal }
          recipeName={ strMeal }
          recipeImg={ strMealThumb }
          recipeIndex={ index }
        />)) }
      <Footer />
=======
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
>>>>>>> 4fb4bc0abe6ae4ec3e4f5a6d0d61653685e5187a
    </>
  );
}
