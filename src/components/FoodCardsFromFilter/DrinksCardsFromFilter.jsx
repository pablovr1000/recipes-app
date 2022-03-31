import React from 'react';
import PropTypes from 'prop-types';

export default function DrinksCardsFromFilter({ drinKname, drinkLink, drinkId }) {
  return (
    <div data-testid={ `${drinkId}-recipe-card` }>
      <p data-testid={ `${drinkId}-card-name` }>{ drinKname }</p>
      <img data-testid={ `${drinkId}-card-img` } src={ drinkLink } alt={ drinkLink } />
    </div>
  );
}

DrinksCardsFromFilter.propTypes = {
  drinKname: PropTypes.string.isRequired,
  drinkLink: PropTypes.string.isRequired,
  drinkId: PropTypes.number.isRequired,
};
