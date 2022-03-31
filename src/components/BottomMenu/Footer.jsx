import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <button
          type="button"
        >
          <img
            src={ drinkIcon }
            alt="profile-pic"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/explore">
        <button
          type="button"
        >
          <img
            src={ exploreIcon }
            alt="profile-pic"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/foods">
        <button
          type="button"
        >
          <img
            src={ mealIcon }
            alt="profile-pic"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
}
