import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getFoodDetails, getDrinkDetails } from '../../services/API';
import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeDetails({ id, index }) { // ID 52771 food | drinks 178319
  const [recipeToRender, setRecipeToRender] = useState({});

  useEffect(() => {
    const urlCategory = -2;
    const category = window.location.href.split('/').at(urlCategory);

    (async () => {
      if (category === 'foods') {
        const food = await getFoodDetails(id);
        setRecipeToRender(food);
      }
      if (category === 'drinks') {
        const drink = await getDrinkDetails(id);
        setRecipeToRender(drink);
      }
    })();
  }, [id]);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeToRender.strMealThumb || recipeToRender.strDrinkThumb }
        alt={ `Imagem da receita ${recipeToRender.strMeal || recipeToRender.strDrink}` }
      />
      <h1
        data-testid="recipe-title"
      >
        {recipeToRender.strMeal || recipeToRender.strDrink}
      </h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{recipeToRender.strCategory}</p>
      <p
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        Ingredients
      </p>
      <p data-testid="instructions">{recipeToRender.strInstructions}</p>
      <iframe
        data-testid="video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/2PPWcZBHzWM"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <RecipeCard data-testid={ `${index}-recomendation-card` } />
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;
