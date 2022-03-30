import React from 'react';
import { useHistory } from 'react-router-dom';

import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

export default function DrinkDetails() {
  const history = useHistory();

  console.log(history);
  return (
    <>
      <div>DrinkDetails</div>
      <RecipeDetails />
    </>
  );
}
