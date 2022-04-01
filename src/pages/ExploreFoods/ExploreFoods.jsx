import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/BottomMenu/Footer';
import Header from '../../components/Header/Header';

export default function ExploreFoods() {
  const [id, setID] = useState();

  async function getIDFoodRandom() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    const IdFood = (data.meals[0].idMeal);
    setID(IdFood);
  }
  return (
    <>
      <Header />
      <div>Explore Foods</div>
      <main>
        <Link to="/explore/foods/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to="/explore/foods/nationalities">
          <button
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>
        <Link to={ `/foods/:${id}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ getIDFoodRandom }
          >
            Surprise me!
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
