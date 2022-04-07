import React from 'react';
import PropTypes from 'prop-types';

export default function FilterButtons({ stgName, fetchFunction }) {
  return (
    <button
      type="button"
      data-testid={ `${stgName}-category-filter` }
      value={ stgName }
      onClick={ ({ target }) => fetchFunction(target.value) }
    >
      { stgName }
    </button>
  );
}

FilterButtons.propTypes = {
  stgName: PropTypes.string.isRequired,
  fetchFunction: PropTypes.func.isRequired,
};
