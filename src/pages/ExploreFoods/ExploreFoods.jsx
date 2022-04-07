import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { getIDFoodRandom } from '../../services/API';

export default function ExploreFoods() {
  const history = useHistory();

  const redirectToFoodsRandom = async () => {
    const id = await getIDFoodRandom();
    history.push(`/foods/${id}`);
  };

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
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ redirectToFoodsRandom }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </>
  );
}
