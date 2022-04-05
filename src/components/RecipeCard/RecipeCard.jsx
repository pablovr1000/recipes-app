import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipeName, recipeImg, recipeId, recipeIndex }) {
  return (
    <Link to={ `/foods/${recipeId}` }>
      <div data-testid={ `${recipeIndex}-recipe-card` }>
        <img
          data-testid={ `${recipeIndex}-card-img` }
          src={ recipeImg }
          alt={ recipeName }
        />
        <p data-testid={ `${recipeIndex}-card-name` }>{recipeName}</p>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
