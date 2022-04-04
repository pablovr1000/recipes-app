import React from 'react';
import Header from '../../components/Header/Header';

export default function Profile() {
  return (
    <>
      <Header />
      <div>
        <h1 data-testid="profile-email">Email</h1>
        <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
        <button data-testid="profile-logout-btn" type="button">Logout</button>
      </div>
    </>
  );
}
