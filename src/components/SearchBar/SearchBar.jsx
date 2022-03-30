import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import recipesContext from '../../context/recipesContext';
import { INITIAL_SEARCH_OPTIONS } from '../../utils/constants';

export default function SearchBar() {
  const [searchOptions, setSearchOptions] = useState(INITIAL_SEARCH_OPTIONS);
  const [currentPage, setCurrentPage] = useState('');
  const [redirectToId, setRedirectToId] = useState('');
  const { recipeResults, getRecipes } = useContext(recipesContext);

  useEffect(() => {
    setCurrentPage(window.location.href.split('/').pop());
  }, []);

  useEffect(() => {
    if (!recipeResults) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (recipeResults.length === 1) {
      setRedirectToId(recipeResults[0].idMeal || recipeResults[0].idDrink);
    }
  }, [recipeResults]);

  const handleChangeInputSearch = ({ target }) => {
    setSearchOptions({ ...searchOptions, search: target.value });
  };

  const handleChangeOptionFilter = ({ target }) => {
    setSearchOptions({ ...searchOptions, option: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { search, option } = searchOptions;

    if (option === 'f' && search.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }

    getRecipes(currentPage, search, option);
  };

  return (
    <>
      { redirectToId && <Redirect to={ `/${currentPage}/${redirectToId}` } /> }
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleChangeInputSearch }
          value={ searchOptions.search }
        />
        <label htmlFor="ingredient-search">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="type-search"
            id="ingredient-search"
            onChange={ handleChangeOptionFilter }
            value="i"
            checked={ searchOptions.option === 'i' }
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            type="radio"
            data-testid="name-search-radio"
            name="type-search"
            id="name-search"
            onChange={ handleChangeOptionFilter }
            value="s"
            checked={ searchOptions.option === 's' }
          />
          Name
        </label>
        <label htmlFor="first-letter-search">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="type-search"
            id="first-letter-search"
            onChange={ handleChangeOptionFilter }
            value="f"
            checked={ searchOptions.option === 'f' }
          />
          First Letter
        </label>
        <button type="submit" data-testid="exec-search-btn">Search</button>
      </form>
    </>
  );
}
