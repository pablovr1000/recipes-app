import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getRecommendation, getFoodDetails, getDrinkDetails } from '../../services/API';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeDetails.scss';

export default function RecipeDetails({ id }) { // ID 52771 food | drinks 178319
  const [recipeToRender, setRecipeToRender] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

  const urlPageN = -2;
  const page = window.location.href.split('/').at(urlPageN);

  useEffect(() => {
    (async () => {
      const currentRecommendation = await getRecommendation(page);
      setRecommendation(currentRecommendation);
    })();
  }, [page, recipeToRender]);

  useEffect(() => {
    (async () => {
      if (page === 'foods') {
        const food = await getFoodDetails(id);
        setRecipeToRender(food);
      }
      if (page === 'drinks') {
        const drink = await getDrinkDetails(id);
        setRecipeToRender(drink);
      }
    })();
  }, [id, page]);

  useEffect(() => {
    const ingredientsList = Object.entries(recipeToRender)
      .filter(([key]) => key.includes('strIngredient'))
      .filter(([, value]) => value)
      .map(([, value]) => value);

    const measureList = Object.entries(recipeToRender)
      .filter(([key]) => key.includes('strMeasure'))
      .filter(([, value]) => value)
      .map(([, value]) => value);

    setIngredients(ingredientsList);
    setMeasures(measureList);
  }, [recipeToRender]);

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
        ingredients.map((ingredient, index) => (
          <p
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ingredient} - ${measures[index]}`}
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
          recommendation.map((recipe, index) => (
            <RecipeCard
              key={ recipe.idMeal || recipe.idDrink }
              type="recommendation"
              recipeName={ recipe.strMeal || recipe.strCategory }
              recipeImg={ recipe.strMealThumb || recipe.strDrinkThumb }
              recipeIndex={ index }
            />))
        }
      </div>
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;
