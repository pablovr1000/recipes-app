import React from 'react';
import PropTypes from 'prop-types';

export default function AllCategoriesButton({ fetchFunction, categories }) {
  return (
    <button
      type="button"
      data-testid="All-category-filter"
      onClick={ () => fetchFunction(categories) }
    >
      All
    </button>
  );
}

AllCategoriesButton.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  fetchFunction: PropTypes.func,
}.isRequired;
