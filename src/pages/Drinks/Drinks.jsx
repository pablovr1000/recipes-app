import React, { useContext, useEffect, useState } from 'react';

import recipesContext from '../../context/recipesContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { RECIPES_RENDER_QUANTITY } from '../../utils/constants';

export default function Drinks() {
  const { searchResults } = useContext(recipesContext);
  const [recipesToRender, setRecipesToRender] = useState([]);

  useEffect(() => {
    if (searchResults.length > 1) {
      setRecipesToRender(searchResults.slice(0, RECIPES_RENDER_QUANTITY));
    }
  }, [searchResults]);

  return (
    <>
      <div>Drinks</div>
      <SearchBar />
      { recipesToRender.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
        <RecipeCard
          key={ idDrink }
          recipeName={ strDrink }
          recipeImg={ strDrinkThumb }
          recipeIndex={ index }
        />)) }
    </>
  );
}
