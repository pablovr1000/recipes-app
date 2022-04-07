import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import { getIngredientsList } from '../../services/API';

export default function FoodsIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    (async () => {
      const ingredients = await getIngredientsList('foods');
      const ingredientsNames = ingredients.map(({ strIngredient }) => strIngredient);
      setIngredientsList(ingredientsNames);
    })();
  }, []);

  return (
    <>
      <Header />
      <div>Explore Foods</div>
      {
        ingredientsList.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient }
            ingredientName={ ingredient }
            ingredientIndex={ index }
            page="foods"
          />
        ))
      }
      <Footer />
    </>
  );
}
