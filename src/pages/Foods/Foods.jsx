import React, { useContext, useEffect, useState } from 'react';

import recipesContext from '../../context/recipesContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RECIPES_RENDER_QUANTITY } from '../../utils/constants';

export default function Foods() {
  const { searchResults } = useContext(recipesContext);
  const [foodsToRender, setFoodsToRender] = useState([]);

  useEffect(() => {
    if (searchResults.length > 1) {
      setFoodsToRender(searchResults.slice(0, RECIPES_RENDER_QUANTITY));
    }
  }, [searchResults]);

  return (
    <>
      <h1>Foods</h1>
      <SearchBar />
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
