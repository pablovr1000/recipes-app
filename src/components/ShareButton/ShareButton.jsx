import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';

export default function ShareButton({ index, onClick }) {
  return (
    <button
      type="button"
      onClick={ onClick }
    >
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="Share"
      />
    </button>
  );
}

ShareButton.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func,
}.isRequired;
