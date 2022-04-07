import React, { useContext, useEffect, useState } from 'react';
import recipesContext from '../../context/recipesContext';

import Header from '../../components/Header/Header';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import FilterButtons from '../../components/FilterButtons/FilterButtons';
import Footer from '../../components/Footer/Footer';
import AllCategoriesButton
from '../../components/AllCategoriesButton/AllCategoriesButton';

import { RECIPES_RENDER_QUANTITY,
  chosenDrinksCategories,
}
from '../../utils/constants';

export default function Drinks() {
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

  const [recipesToRender, setRecipesToRender] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);
  const [renderDrinkCard, setRenderDrinkCard] = useState([]);

  useEffect(() => {
    const getDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();
      setDrinksArray(Object.values(drinks).splice(0, RECIPES_RENDER_QUANTITY));
    };
    getDrinks();
  }, [setIsSearchBarInputClicked]);

  useEffect(() => {
    if (recipeResults?.length > 1) {
      setRecipesToRender(recipeResults.slice(0, RECIPES_RENDER_QUANTITY));
    }
  }, [recipeResults]);

  useEffect(() => {
    if (isAllClicked) setRenderDrinkCard(allFoods);
    if (filterClicked) setRenderDrinkCard(foodsAndDrinksByFilter);
    if (isSearchBarInputClicked) setRenderDrinkCard(recipesToRender);
    if (!filterClicked && !isSearchBarInputClicked) setRenderDrinkCard(drinksArray);
  }, [isAllClicked,
    filterClicked,
    allFoods,
    foodsAndDrinksByFilter,
    isSearchBarInputClicked,
    recipesToRender,
    drinksArray,
  ]);

  return (
    <>
      <Header />
      <section>
        {
          chosenDrinksCategories.map((category) => ( // todos botões
            <FilterButtons
              fetchFunction={ (filter) => getMealsAndDrinksByFilter(filter) }
              key={ category }
              stgName={ category }
            />
          ))
        }
        <AllCategoriesButton // botão All
          categories={ drinksArray }
          fetchFunction={ getAllCategories }
        />
      </section>
      <main>
        {
          renderDrinkCard.map(({ strDrink, idDrink, strDrinkThumb }, index) => (
            <RecipeCard
              recipeIndex={ index }
              key={ idDrink }
              recipeName={ strDrink }
              recipeImg={ strDrinkThumb }
              recipeId={ idDrink }
              page="drinks"
            />
          ))
        }
      </main>
      <Footer />
    </>
  );
}
