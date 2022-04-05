import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import recipesContext from '../../context/recipesContext';

export default function Login() {
  const history = useHistory();
  const { setUserData } = useContext(recipesContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const PASSWORD_MIN_LENGTH = 6;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length > PASSWORD_MIN_LENGTH;
    if (isEmailValid && isPasswordValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = () => {
    setUserData({ email });
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <div className="containerLogin">
      <form className="formLogin">
        <h3>Login</h3>
        <input
          className="inputLogin"
          name="email"
          type="email"
          data-testid="email-input"
          placeholder="email"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <input
          className="inputPassword"
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <button
          className="buttonLogin"
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleSubmit }
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
