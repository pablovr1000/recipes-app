import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../../components/BottomMenu/Footer';
import Header from '../../components/Header/Header';
import { getIdDrinksRandom } from '../../services/API';

export default function ExploreDrinks() {
  const history = useHistory();

  const redirectToDrinksRandom = async () => {
    const idDrinks = await getIdDrinksRandom();
    history.push(`/drinks/${idDrinks}`);
  };

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
          onClick={ redirectToDrinksRandom }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </>
  );
}
