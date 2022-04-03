import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import recipesContext from '../../context/recipesContext';
import { getFoodDetails, getDrinkDetails } from '../../services/API';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeDetails.scss';

export default function RecipeDetails({ id, page }) { // ID 52771 food | drinks 178319
  const [recipeToRender, setRecipeToRender] = useState({});
  const { recommendations } = useContext(recipesContext);
  const history = useHistory();

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
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
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
      <button
        className="startRecipeBtn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ handleStartRecipe }
        /* disabled={ isDisabled } */
      >
        Start Recipe
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;
