import React from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

export default function DrinkDetails({ match }) {
  return (
    <>
      <div>DrinkDetails</div>
      <RecipeDetails
        id={ match.params.id }
        page="drinks"
      />
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: Number }) }),
}.isRequired;
