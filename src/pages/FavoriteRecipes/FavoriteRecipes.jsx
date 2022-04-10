import React, { useEffect, useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import FavoriteRecipesCard
from '../../components/FavoriteRecipesCard/FavoriteRecipesCard';
import recipesContext from '../../context/recipesContext';

export default function FavoriteRecipes() {
  const [storedFavRecipes, setStoredRecipes] = useState([]);
  const { storageFavoriteRecipes } = useContext(recipesContext);

  useEffect(() => {
    setStoredRecipes(storageFavoriteRecipes);
  }, [storageFavoriteRecipes]);

  return (
    <>
      <Header />
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      {
        storedFavRecipes.map(({
          type,
          nationality,
          category,
          name,
          image,
          alcoholicOrNot,
          id }, index) => (
          (
            <FavoriteRecipesCard
              type={ type }
              nationality={ nationality }
              category={ category }
              name={ name }
              imageSrc={ image }
              key={ name }
              recipeId={ id }
              recipeIndex={ index }
              alcoholicOrNot={ alcoholicOrNot }
            />
          )
        ))
      }
    </>
  );
}
