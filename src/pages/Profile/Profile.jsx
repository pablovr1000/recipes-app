import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../../context/recipesContext';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

export default function Profile() {
  const { userData } = useContext(recipesContext);

  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{userData?.email}</h1>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
