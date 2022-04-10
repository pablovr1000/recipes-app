import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import recipesContext from '../../context/recipesContext';
import { getFoodDetails, getDrinkDetails } from '../../services/API';

export default function FavoriteRecipesCard({
  name,
  type,
  nationality,
  category,
  imageSrc,
  recipeId,
  recipeIndex,
  alcoholicOrNot,
}) {
  const { storageFavoriteRecipes } = useContext(recipesContext);
  const [shareMessage, setShareMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState();
  const [recipeToRender, setRecipeToRender] = useState();

  useEffect(() => {
    (async () => {
      if (type === 'food') {
        const food = await getFoodDetails(recipeId);
        setRecipeToRender(food);
        return;
      }
      const drink = await getDrinkDetails(recipeId);
      setRecipeToRender(drink);
    })();
  }, [recipeId, type, setRecipeToRender]);

  useEffect(() => {
    const isFavoriteRecipe = storageFavoriteRecipes
      .some((recipe) => recipe.id === recipeId);
    setIsFavorite(isFavoriteRecipe);
  }, [storageFavoriteRecipes, setIsFavorite, recipeId]);

  const handleShareRecipe = () => {
    const THREE_SECONDS = 3000;
    let pageName = '';
    if (type === 'food') pageName = 'foods';
    if (type === 'drink') pageName = 'drinks';
    copy(`http://localhost:3000/${pageName}/${recipeId}`);
    setShareMessage(true);
    setTimeout(() => setShareMessage(false), THREE_SECONDS);
  };

  return (
    <div>
      { shareMessage && <p>Link copied!</p> }
      <h2 data-testid={ `${recipeIndex}-horizontal-top-text` }>
        { type === 'drink' ? alcoholicOrNot : `${nationality} - ${category}` }
      </h2>
      <p data-testid={ `${recipeIndex}-horizontal-name` }>
        {name}
      </p>
      <p>{ `Nacionalidade: ${nationality}` }</p>
      <p>{ `Categoria: ${category}` }</p>
      <img
        data-testid={ `${recipeIndex}-horizontal-image` }
        src={ imageSrc }
        alt={ name }
        width="40%"
      />
      <button
        type="button"
        onClick={ handleShareRecipe }
      >
        <img
          data-testid={ `${recipeIndex}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Share"
        />
      </button>
      <FavoriteButton
        isFavorite={ isFavorite }
        recipeToRender={ recipeToRender }
        id={ recipeId }
        page={ type }
        testId={ `${recipeIndex}-horizontal-favorite-btn` }
      />
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  nationality: PropTypes.string,
  category: PropTypes.string,
  imageSrc: PropTypes.string,
  recipeId: PropTypes.number,
  recipeIndex: PropTypes.number,
  alcoholicOrNot: PropTypes.string,
}.isRequired;
