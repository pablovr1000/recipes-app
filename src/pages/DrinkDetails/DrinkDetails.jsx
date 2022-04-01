import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import recipesContext from '../../context/recipesContext';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { getRecommendations } from '../../services/API';

export default function DrinkDetails({ match }) {
  const { recommendations, setRecommendations } = useContext(recipesContext);

  useEffect(() => {
    if (!('foods' in recommendations)) {
      (async () => {
        const { foods } = await getRecommendations();
        setRecommendations({ ...recommendations, foods });
      })();
    }
  }, [recommendations, setRecommendations]);

  return (
    <>
      <div>DrinkDetails</div>
      {
        recommendations?.foods?.length > 0 && (
          <RecipeDetails
            id={ match.params.id }
            page="drinks"
            recommendations={ recommendations.foods }
          />)
      }
    </>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: Number }) }),
}.isRequired;
