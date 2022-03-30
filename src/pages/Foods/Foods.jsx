import React, { useContext, useEffect, useState } from 'react';

import recipesContext from '../../context/recipesContext';
// import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RECIPES_RENDER_QUANTITY } from '../../utils/constants';

export default function Foods() {
  const { recipeResults } = useContext(recipesContext);
  const [foodsToRender, setFoodsToRender] = useState([]);

  useEffect(() => {
    if (recipeResults?.length > 1) {
      setFoodsToRender(recipeResults.slice(0, RECIPES_RENDER_QUANTITY));
    }
  }, [recipeResults]);

  return (
    <>
      <h1>Foods</h1>
      { foodsToRender.map(({ idMeal, strMeal, strMealThumb }, index) => (
        <RecipeCard
          key={ idMeal }
          recipeName={ strMeal }
          recipeImg={ strMealThumb }
          recipeIndex={ index }
        />)) }
    </>
  );
}
