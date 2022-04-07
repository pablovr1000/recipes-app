import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NationalityCard({
  recipeName,
  recipeImg,
  recipeIndex,
  recipeId }) {
  return (
    <Link to={ `/foods/${recipeId}` }>
      <div data-testid={ `${recipeIndex}-recipe-card` }>
        <img
          src={ recipeImg }
          alt={ recipeName }
          data-testid={ `${recipeIndex}-card-img` }
        />
        <p data-testid={ `${recipeIndex}-card-name` }>
          { recipeName }
        </p>
      </div>
    </Link>
  );
}

NationalityCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImg: PropTypes.string,
  recipeIndex: PropTypes.number,
  recipeId: PropTypes.number,
}.isRequerid;
