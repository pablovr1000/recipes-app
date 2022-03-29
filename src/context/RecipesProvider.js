import React, { useState } from 'react';
import PropTypes from 'prop-types';

import recipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <recipesContext.Provider value={ { searchResults, setSearchResults } }>
      {children}
    </recipesContext.Provider>
  );
}

export default RecipesProvider;

RecipesProvider.propTypes = {
  children: PropTypes.object,
}.isRequired;
