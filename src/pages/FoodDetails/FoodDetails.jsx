import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import recipesContext from '../../context/recipesContext';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { getRecommendations } from '../../services/API';

export default function FoodDetails({ match }) {
  const { recommendations, setRecommendations } = useContext(recipesContext);

  useEffect(() => {
    console.log(recommendations);
    if (!('drinks' in recommendations)) {
      console.log(recommendations);
      (async () => {
        const { drinks } = await getRecommendations();
        setRecommendations({ ...recommendations, drinks });
      })();
    }
  }, [recommendations, setRecommendations]);

  return (
    <>
      <div>FoodDetails</div>
      {
        recommendations?.drinks?.length > 0 && (
          <RecipeDetails
            id={ match.params.id }
            page="foods"
            recommendations={ recommendations.drinks }
          />)
      }
    </>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: Number }) }),
}.isRequired;
