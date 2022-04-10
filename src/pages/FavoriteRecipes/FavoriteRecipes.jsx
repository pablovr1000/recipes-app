import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/Header/Header';
import FavoriteRecipesCard
from '../../components/FavoriteRecipesCard/FavoriteRecipesCard';
import recipesContext from '../../context/recipesContext';

export default function FavoriteRecipes() {
  const { storageFavoriteRecipes } = useContext(recipesContext);
  const [recipesToRender, setRecipesToRender] = useState(storageFavoriteRecipes);

  const conditionalRenderins = (filterName) => {
    if (filterName === '') {
      setRecipesToRender(storageFavoriteRecipes);
      return;
    }
    setRecipesToRender(storageFavoriteRecipes.filter(({ type }) => type === filterName));
  };

  useEffect(() => {
    setRecipesToRender(storageFavoriteRecipes);
  }, [storageFavoriteRecipes]);

  return (
    <>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => conditionalRenderins('') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => conditionalRenderins('food') }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => conditionalRenderins('drink') }
        >
          Drinks

        </button>
      </div>
      {
        recipesToRender.map(({
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
              key={ id }
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
