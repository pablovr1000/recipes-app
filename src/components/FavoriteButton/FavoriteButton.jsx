import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import recipesContext from '../../context/recipesContext';

import notFavoriteIcon from '../../images/whiteHeartIcon.svg';
import isFavoriteIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteButton({
  isFavorite,
  id,
  page,
  recipeToRender,
  dataTestId,
}) {
  const { setStorageFavoriteRecipes,
    storageFavoriteRecipes } = useContext(recipesContext);

  const handleFavoriteRecipe = () => {
    if (isFavorite) {
      const newFavoriteList = storageFavoriteRecipes
        .filter((recipe) => recipe.id !== id);
      setStorageFavoriteRecipes(newFavoriteList);
    } else {
      const favoriteRecipe = { id,
        type: page === 'foods' ? 'food' : 'drink',
        nationality: recipeToRender.strArea || '',
        category: recipeToRender.strCategory || '',
        alcoholicOrNot: recipeToRender.strAlcoholic || '',
        name: recipeToRender.strMeal || recipeToRender.strDrink,
        image: recipeToRender.strMealThumb || recipeToRender.strDrinkThumb };
      setStorageFavoriteRecipes([...storageFavoriteRecipes, favoriteRecipe]);
    }
  };

  return (
    <button
      type="button"
      onClick={ handleFavoriteRecipe }
    >
      <img
        src={ isFavorite ? isFavoriteIcon : notFavoriteIcon }
        data-testid={ dataTestId }
        alt="Favorite"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  recipeToRender: PropTypes.object,
  id: PropTypes.string,
  page: PropTypes.string,
  dataTestId: PropTypes.string,
}.isRequired;
// criar um estado que vai salvar array
