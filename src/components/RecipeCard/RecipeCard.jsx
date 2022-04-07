import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.scss';

export default function RecipeCard({ type, recipeName, recipeImg, recipeIndex }) {
  return (
    <div
      className="recipe-card-container"
      data-testid={
        type ? `${recipeIndex}-recomendation-card` : `${recipeIndex}-recipe-card`
      }
    >
      <img
        data-testid={ `${recipeIndex}-card-img` }
        src={ recipeImg }
        alt={ recipeName }
      />
      <p
        data-testid={
          type ? `${recipeIndex}-recomendation-title` : `${recipeIndex}-card-name`
        }
      >
        {recipeName}
      </p>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
