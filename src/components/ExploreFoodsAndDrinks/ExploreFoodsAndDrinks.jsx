import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getByNationality, standardArray } from '../../services/API';
import NationalityCard from '../NationalityCard/NationalityCard';

export default function ExploreFoodsAndDrinks({ page }) {
  const [nationalities, setNationalities] = useState([]);
  const [selectValue, setSelectValue] = useState('');
  const [recipesToRender, setRecipesToRender] = useState([]);

  useEffect(() => {
    (async () => {
      const getByNationalityFunc = await getByNationality();
      setNationalities(getByNationalityFunc);
      if (page === 'foods') {
        setRecipesToRender(await standardArray());
      }
      // if (page === 'drinks') {

      // }
    })();
  }, [setNationalities, page]);

  const requestNationality = async ({ target }) => {
    setSelectValue(target.value);
    const CATEGORIES_MAX_LENGTH = 12;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
    const { meals } = await response.json();
    setRecipesToRender(meals.slice(0, CATEGORIES_MAX_LENGTH));
  };

  return (
    <section>
      <select
        onChange={ requestNationality }
        data-testid="explore-by-nationality-dropdown"
        value={ selectValue }
      >
        {
          nationalities.map(({ strArea }) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ strArea }
            >
              {strArea}

            </option>
          ))
        }
      </select>
      {
        recipesToRender.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <NationalityCard
            key={ idMeal }
            recipeName={ strMeal }
            recipeImg={ strMealThumb }
            recipeIndex={ index }
            recipeId={ idMeal }
          />))
      }
    </section>
  );
}

ExploreFoodsAndDrinks.propTypes = {
  pages: PropTypes.string,
}.isRequerid;
