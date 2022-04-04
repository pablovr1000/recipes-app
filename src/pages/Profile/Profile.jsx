import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

export default function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const profileStorage = JSON.parse(localStorage.getItem('user'));
    setUserData(profileStorage);
  }, []);

  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{userData.email}</h1>
      <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      <button data-testid="profile-logout-btn" type="button">Logout</button>
    </div>
  );
}
