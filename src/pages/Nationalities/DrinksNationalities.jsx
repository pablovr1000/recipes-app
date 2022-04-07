import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ExploreFoodsAndDrinks
from '../../components/ExploreFoodsAndDrinks/ExploreFoodsAndDrinks';

export default function DrinksNationalities() {
  return (
    <>
      <Header />
      <div>Drinks Nationalities</div>
      <ExploreFoodsAndDrinks page="drinks" />
      <Footer />
    </>
  );
}
