import React from 'react';
import PropTypes from 'prop-types';

import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

export default function FoodDetails({ match }) {
  return (
    <>
      <div>FoodDetails</div>
      <RecipeDetails id={ match.params.id } />
    </>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: Number }) }),
}.isRequired;
