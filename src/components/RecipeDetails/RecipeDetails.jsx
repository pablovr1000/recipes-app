import React from 'react';

import RecipeCard from '../RecipeCard/RecipeCard';

export default function RecipeDetails() {
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src=""
        alt=""
        /* alt={ `Imagem da receita ${recipeTitle}` } */
      />
      <h1 data-testid="recipe-title">Recipe Title</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Category text</p>
      <p data-testid="0-ingredient-name-and-measure">Ingredients</p>
      {/* <p data-testid={ `${index}-ingredient-name-and-measure` }>Ingredients</p> */}
      <p data-testid="instructions">Instructions</p>
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
      <RecipeCard data-testid="0-recomendation-card" />
      {/* <RecipeCard data-testid={ `${index}-recomendation-card` } /> */}
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </div>
  );
}
