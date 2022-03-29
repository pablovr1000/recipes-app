import React, { useState, useEffect } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header() {
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [urlParam, setUrlParam] = useState('');
  const [concatParams, setConcatParams] = useState('');

  useEffect(() => {
    setUrlParam(window.location.href.split('/').pop().charAt(0).toUpperCase()
    + window.location.href.split('/').pop().slice(1));
    if (urlParam === 'Drinks' || urlParam === 'Foods'
    || urlParam === 'Explore Nationalities') {
      setIsImgVisible(true);
    }
    if (window.location.href === 'http://localhost:3000/explore/foods'
    || window.location.href === 'http://localhost:3000/explore/drinks') {
      const firstParam = window.location.href.split('/')[3].charAt(0).toUpperCase()
      + window.location.href.split('/')[3].slice(1);

      const secParam = window.location.href.split('/')[4].charAt(0).toUpperCase()
      + window.location.href.split('/')[4].slice(1);
      setUrlParam(concatParams);
      setConcatParams(`${firstParam} ${secParam}`);
    }
    if (window.location.href === 'http://localhost:3000/explore/foods/ingredients'
    || window.location.href === 'http://localhost:3000/explore/drinks/ingredients'
    || window.location.href === 'http://localhost:3000/explore/foods/nationalities') {
      const firstParam = window.location.href.split('/')[3].charAt(0).toUpperCase()
      + window.location.href.split('/')[3].slice(1);
      const secParam = window.location.href.split('/')[5].charAt(0).toUpperCase()
      + window.location.href.split('/')[5].slice(1);
      setConcatParams(`${firstParam} ${secParam}`);
      setUrlParam(concatParams);
    }
    if (window.location.href === 'http://localhost:3000/done-recipes'
    || window.location.href === 'http://localhost:3000/favorite-recipes') {
      const done = window.location.href.split('/').pop()
        .split('-')[0].charAt(0).toUpperCase()
        + window.location.href.split('/')[3].slice(1).split('-')[0];
      const recipes = window.location.href.split('/').pop()
        .split('-')[1].charAt(0).toUpperCase()
        + window.location.href.split('/').pop().split('-')[1].slice(1);
      setConcatParams(`${done} ${recipes}`);
      setUrlParam(concatParams);
    }
  }, [urlParam, concatParams]);
  return (
    <header>
      <span>Header</span>
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
        isImgVisible
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
