import React, { useState, useEffect } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const headerTitles = {
  foods: 'Foods',
  drinks: 'Drinks',
  explore: 'Explore',
  explore_foods: 'Explore Foods',
  explore_drinks: 'Explore Drinks',
  explore_foods_ingredients: 'Explore Ingredients',
  explore_drinks_ingredients: 'Explore Ingredients',
  explore_foods_nationalities: 'Explore Nationalities',
  done_recipes: 'Done Recipes',
  favorite_recipes: 'Favorite Recipes',
  profile: 'Profile',
};

export default function Header() {
  const [isSearchBarBtnVisible, setIsSearchBarBtnVisible] = useState(false);
  const [urlParam, setUrlParam] = useState('');

  useEffect(() => {
    const searchBarButtonPages = ['Drinks', 'Foods', 'Explore Nationalities'];
    if (searchBarButtonPages.includes(urlParam)) setIsSearchBarBtnVisible(true);

    const titleFromUrl = 3;
    let url = window.location.href.split('/').splice(titleFromUrl).join('_');

    if (url === 'done-recipes' || url === 'favorite-recipes') {
      url = url.replace('-', '_');
    }

    setUrlParam(headerTitles[url]);
  }, [urlParam]);
  return (
    <header>
      <h1 data-testid="page-title">{ urlParam }</h1>
      <div>
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="profile-pic"
            data-testid="profile-top-btn"
          />
        </button>
      </div>
      {
        isSearchBarBtnVisible
      && (
        <div>
          <button
            type="button"
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="profile-pic"
            />
          </button>
        </div>
      )
      }
    </header>
  );
}
