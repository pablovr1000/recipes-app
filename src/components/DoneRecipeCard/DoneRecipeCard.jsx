import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import ShareButton from '../ShareButton/ShareButton';

export default function DoneRecipeCard({ index, recipe }) {
  const [shareMessage, setShareMessage] = useState(false);

  const handleShareClick = () => {
    const THREE_SECONDS = 3000;
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setShareMessage(true);
    setTimeout(() => setShareMessage(false), THREE_SECONDS);
  };

  return (
    <div>
      <ShareButton index={ index } onClick={ handleShareClick } />
      { shareMessage && <p>Link copied!</p> }
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
          width="40%"
        />
        <p data-testid={ `${index}-horizontal-top-text` }>
          { recipe.alcoholicOrNot ? recipe.alcoholicOrNot
            : `${recipe.nationality} - ${recipe.category}` }
        </p>
        <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
        {
          recipe.tags.map((tagName) => (
            <p
              data-testid={ `${index}-${tagName}-horizontal-tag` }
              key={ tagName }
            >
              {tagName}
            </p>
          ))
        }
      </Link>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  index: PropTypes.number,
}.isRequired;
