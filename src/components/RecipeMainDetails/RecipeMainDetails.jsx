import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import recipesContext from '../../context/recipesContext';

import { getFoodDetails, getDrinkDetails } from '../../services/API';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import shareIcon from '../../images/shareIcon.svg';

export default function RecipeMainDetails({ id, page }) {
  const [shareMessage, setShareMessage] = useState(false);
  const [recipeToRender, setRecipeToRender] = useState({});
  const [isFavorite, setIsFavorite] = useState();
  const { storageFavoriteRecipes } = useContext(recipesContext);

  useEffect(() => {
    (async () => {
      if (page === 'foods') {
        const food = await getFoodDetails(id);
        setRecipeToRender(food);
        return;
      }
      const drink = await getDrinkDetails(id);
      setRecipeToRender(drink);
    })();
  }, [id, page]);

  useEffect(() => {
    const isFavoriteRecipe = storageFavoriteRecipes
      .some((recipe) => recipe.id === id);
    setIsFavorite(isFavoriteRecipe);
  }, [storageFavoriteRecipes, id]);

  const ingredientsAndMeasures = useMemo(() => {
    const ingredients = Object.entries(recipeToRender)
      .filter(([key]) => key.includes('strIngredient'))
      .filter(([, value]) => value)
      .map(([, value]) => value);

    const measures = Object.entries(recipeToRender)
      .filter(([key]) => key.includes('strMeasure'))
      .filter(([, value]) => value)
      .map(([, value]) => value);

    return { ingredients, measures };
  }, [recipeToRender]);

  const handleShareRecipe = () => {
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${page}/${id}`);
    setShareMessage(true);
    setTimeout(() => setShareMessage(false), THREE_SECONDS);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeToRender.strMealThumb || recipeToRender.strDrinkThumb }
        alt={ `Imagem da receita ${recipeToRender.strMeal || recipeToRender.strDrink}` }
        width="40%"
      />
      <h1
        data-testid="recipe-title"
      >
        {recipeToRender.strMeal || recipeToRender.strDrink}
      </h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShareRecipe }
      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <FavoriteButton
        isFavorite={ isFavorite }
        recipeToRender={ recipeToRender }
        id={ id }
        page={ page }
        dataTestId="favorite-btn"
      />
      { shareMessage && <p>Link copied!</p> }
      <p data-testid="recipe-category">
        {page === 'drinks' ? recipeToRender.strAlcoholic : recipeToRender.strCategory}
      </p>
      {
        ingredientsAndMeasures.ingredients.map((ingredient, index) => (
          <p
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient} - ${ingredientsAndMeasures.measures[index]}`}
          </p>
        ))
      }
      <p data-testid="instructions">{recipeToRender.strInstructions}</p>
      { recipeToRender.strYoutube && <iframe
        data-testid="video"
        width="360"
        height="203"
        src={ recipeToRender.strYoutube.replace('/watch?v=', '/embed/') }
        title="YouTube video player"
      />}
    </div>
  );
}

RecipeMainDetails.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;
