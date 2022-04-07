import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/BottomMenu/Footer';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import { getIngredientsList } from '../../services/API';

export default function DrinksIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    (async () => {
      const ingredients = await getIngredientsList('drinks');
      const ingredientsNames = ingredients.map(({ strIngredient1 }) => strIngredient1);
      setIngredientsList(ingredientsNames);
    })();
  }, []);

  return (
    <>
      <Header />
      <div>DrinksIngredients</div>
      {
        ingredientsList.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient }
            ingredientName={ ingredient }
            ingredientIndex={ index }
            page="drinks"
          />
        ))
      }
      <Footer />
    </>
  );
}
