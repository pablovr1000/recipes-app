import React, { useContext, useState, useEffect } from 'react';
import recipesContext from '../../context/recipesContext';

import DoneRecipeCard from '../../components/DoneRecipeCard/DoneRecipeCard';
import Header from '../../components/Header/Header';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const { storageDoneRecipes } = useContext(recipesContext);

  useEffect(() => {
    setDoneRecipes(storageDoneRecipes);
  }, [storageDoneRecipes]);

  const handleFilterChange = ({ target }) => {
    if (target.value === 'all') {
      setDoneRecipes(storageDoneRecipes);
      return;
    }

    const filteredDoneRecipes = doneRecipes
      .filter((recipe) => recipe.type === target.value);
    setDoneRecipes(filteredDoneRecipes);
  };

  return (
    <>
      <Header />
      <div>DoneRecipes</div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ handleFilterChange }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ handleFilterChange }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilterChange }
        >
          Drinks
        </button>
      </div>
      {
        doneRecipes.map((recipe, index) => (
          <DoneRecipeCard key={ recipe.id } index={ index } recipe={ recipe } />
        ))
      }
    </>
  );
}

// [{
//   id: id-da-receita,
//   type: comida-ou-bebida,
//   nationality: nacionalidade-da-receita-ou-texto-vazio,
//   category: categoria-da-receita-ou-texto-vazio,
//   alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
//   name: nome-da-receita,
//   image: imagem-da-receita,
//   doneDate: quando-a-receita-foi-concluida,
//   tags: array-de-tags-da-receita-ou-array-vazio
// }]
