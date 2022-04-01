import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../../components/BottomMenu/Footer';
import Header from '../../components/Header/Header';

export default function ExploreDrinks() {
  const history = useHistory();

  async function getIdDrinksRandom() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.drinks[0].idDrink);
    const idDrinks = data.drinks[0].idDrink;
    history.push(`/drinks/${idDrinks}`);
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

        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ getIdDrinksRandom }
        >
          Surprise me!
        </button>

      </main>
      <Footer />
    </>
  );
}
