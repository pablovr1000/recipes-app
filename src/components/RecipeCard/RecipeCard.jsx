import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ type, recipeName, recipeImg, recipeIndex }) {
  return (
    <div
      data-testid={
        type ? `${recipeIndex}-recomendation-card` : `${recipeIndex}-recipe-card`
      }
    >
      <img
        data-testid={ `${recipeIndex}-card-img` }
        src={ recipeImg }
        alt={ recipeName }
      />
      <p data-testid={ `${recipeIndex}-card-name` }>{recipeName}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
