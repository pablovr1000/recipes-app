import React, { useState, useEffect, useContext } from 'react';
<<<<<<< HEAD
import { Redirect, useHistory } from 'react-router-dom';

=======
import { Redirect } from 'react-router-dom';
>>>>>>> 4fb4bc0abe6ae4ec3e4f5a6d0d61653685e5187a
import recipesContext from '../../context/recipesContext';
import { INITIAL_SEARCH_OPTIONS } from '../../utils/constants';

export default function SearchBar() {
  const [searchOptions, setSearchOptions] = useState(INITIAL_SEARCH_OPTIONS);
  const [redirectToId, setRedirectToId] = useState('');
<<<<<<< HEAD
  const { recipeResults, getRecipes } = useContext(recipesContext);
  const history = useHistory();

  useEffect(() => {
    setCurrentPage(history.location.pathname.split('/')[1]);
  }, [history]);
=======
  const {
    recipeResults,
    getRecipes,
    currentPage,
    setCurrentPage,
    setIsSearchBarInputClicked,
    filterClicked,
    setFilterClicked,
  } = useContext(recipesContext);

  useEffect(() => {
    setCurrentPage(window.location.href.split('/').pop());
  }, [setCurrentPage]);
>>>>>>> 4fb4bc0abe6ae4ec3e4f5a6d0d61653685e5187a

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
    if (filterClicked !== '') {
      setFilterClicked('');
    }
    setIsSearchBarInputClicked(true);

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
