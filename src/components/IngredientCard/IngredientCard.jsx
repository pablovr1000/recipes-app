import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import recipesContext from '../../context/recipesContext';

function IngredientCard({ ingredientName, ingredientIndex, page }) {
  const [ingredientImg, setIngredientImg] = useState('');
  const { getMealsAndDrinksByIngredient } = useContext(recipesContext);
  const history = useHistory();

  useEffect(() => {
    const API_URL = page === 'foods' ? 'themealdb' : 'thecocktaildb';
    setIngredientImg(`https://www.${API_URL}.com/images/ingredients/${ingredientName}-Small.png`);
  }, [ingredientName, page]);

  const handleIngredientClick = () => {
    getMealsAndDrinksByIngredient(ingredientName, page);
    history.push(`/${page}`);
  };

  return (
    <div
      role="button"
      onClick={ handleIngredientClick }
      onKeyDown={ handleIngredientClick }
      tabIndex="0"
    >
      <div
        data-testid={ `${ingredientIndex}-ingredient-card` }
      >
        <img
          data-testid={ `${ingredientIndex}-card-img` }
          src={ ingredientImg }
          alt={ ingredientName }
        />
        <p data-testid={ `${ingredientIndex}-card-name` }>{ingredientName}</p>
      </div>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredientName: PropTypes.string,
  ingredientIndex: PropTypes.number,
  page: PropTypes.string,
}.isRequired;

export default IngredientCard;
