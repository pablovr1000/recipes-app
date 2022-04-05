import React, { useMemo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import recipesContext from '../../context/recipesContext';
import RecipeMainDetails from '../RecipeMainDetails/RecipeMainDetails';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeDetails.scss';

export default function RecipeDetails({ id, page }) { // ID 52771 food | drinks 178319
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

  const handleStartRecipe = () => {
    history.push(`/${page}/${id}/in-progress`);
  };

  return (
    <div>
      <RecipeMainDetails id={ id } page={ page } />
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
        >
          { isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
        </button>)}
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;
