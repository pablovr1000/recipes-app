import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/BottomMenu/Footer';
import Header from '../../components/Header/Header';

export default function ExploreDrinks() {
  const [id, setID] = useState();

  async function getIdDrinksRandom() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.drinks[0].idDrink);
    const idDrinks = data.drinks[0].idDrink;
    console.log(idDrinks);
    setID(idDrinks);
    console.log(id);
  }
  return (
    <>
      <Header />
      <div>Explore Drinks</div>
      <main>
        <Link to="/explore/drinks/ingredients">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>
        <Link to={ `/drinks/${id}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            onClick={ getIdDrinksRandom }
          >
            Surprise me!
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}
