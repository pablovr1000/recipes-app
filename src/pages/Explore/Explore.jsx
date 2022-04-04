import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/BottomMenu/Footer';
import Header from '../../components/Header/Header';

export default function Explore() {
  return (
    <>
      <Header />
      <Link to="/explore/foods">
        <button type="button" data-testid="explore-foods">Explore Foods</button>
      </Link>
      <Link to="/explore/drinks">
        <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      </Link>
      <Footer />
    </>
  );
}
