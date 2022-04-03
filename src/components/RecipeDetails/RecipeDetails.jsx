import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import recipesContext from '../../context/recipesContext';
import { getFoodDetails, getDrinkDetails } from '../../services/API';
import RecipeCard from '../RecipeCard/RecipeCard';
import shareIcon from '../../images/shareIcon.svg';
import './RecipeDetails.scss';

export default function RecipeDetails({ id, page }) { // ID 52771 food | drinks 178319
  const [recipeToRender, setRecipeToRender] = useState({});
  const [shareMessage, setShareMessage] = useState(false);
  const { recommendations,
    storageDoneRecipes,
    storageInProgressRecipes } = useContext(recipesContext);
  const history = useHistory();

  const { isRecipeDone, isRecipeInProgress } = useMemo(() => {
    const convertPageToKey = { drinks: 'cocktails', foods: 'meals' };
    const recipeDone = storageDoneRecipes.some((recipe) => recipe.id === id);
    const recipeInProgress = storageInProgressRecipes?.[convertPageToKey[page]]?.[id];

    return { isRecipeDone: recipeDone, isRecipeInProgress: recipeInProgress };
  }, [storageDoneRecipes, storageInProgressRecipes, id, page]);

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

  const handleStartRecipe = () => {
    history.push(`/${page}/${id}/in-progress`);
  };

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
      <button type="button" data-testid="favorite-btn">Favoritar</button>
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
      <div
        className="recommendation-container"
      >
        {
          recommendations[page]?.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              type="recommendation"
              recipeName={ recipe.strMeal || recipe.strDrink }
              recipeImg={ recipe.strMealThumb || recipe.strDrinkThumb }
              recipeIndex={ index }
            />))
        }
      </div>
      {!isRecipeDone && (
        <button
          className="startRecipeBtn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleStartRecipe }
        // disabled={ isDisabled }
        >
          { isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>)}
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;
