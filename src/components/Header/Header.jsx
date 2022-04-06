import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { headerTitles } from '../../utils/constants';

export default function Header() {
  const [isSearchBarBtnVisible, setIsSearchBarBtnVisible] = useState(false);
  const [urlParam, setUrlParam] = useState('');
  const [isBloomClicked, setIsBloomClicked] = useState(false);
  const history = useHistory();

  const toggleSearchInput = () => {
    setIsBloomClicked((prevState) => (!prevState));
  };

  useEffect(() => {
    const searchBarButtonPages = ['Drinks', 'Foods', 'Explore Nationalities'];
    if (searchBarButtonPages.includes(urlParam)) setIsSearchBarBtnVisible(true);

    let url = history.location.pathname.split('/')[1];

    if (url === 'done-recipes' || url === 'favorite-recipes') {
      url = url.replace('-', '_');
    }

    setUrlParam(headerTitles[url]);
  }, [urlParam, history]);

  return (
    <header>
      <h1 data-testid="page-title">{ urlParam }</h1>
      <div>
        <Link to="/profile">
          <button
            type="button"
          >
            <img
              src={ profileIcon }
              alt="profile-pic"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      </div>
      {
        isSearchBarBtnVisible
      && (
        <div>
          <button
            type="button"
            onClick={ toggleSearchInput }
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
      {
        isBloomClicked && <SearchBar />
      }
    </header>
  );
}
