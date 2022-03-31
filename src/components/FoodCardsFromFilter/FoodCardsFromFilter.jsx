import React from 'react';
import PropTypes from 'prop-types';

export default function FoodCardsFromFilter({ mealName, imageLink, mealId }) {
  return (
    <div data-testid={ `${mealId}-recipe-card` }>
      <p data-testid={ `${mealId}-card-name` }>{ mealName }</p>
      <img data-testid={ `${mealId}-card-img` } src={ imageLink } alt={ imageLink } />
    </div>
  );
}

FoodCardsFromFilter.propTypes = {
  mealName: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  mealId: PropTypes.number.isRequired,
};
