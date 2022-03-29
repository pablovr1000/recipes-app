import React, { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const validateLogin = () => {
      const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      const PASSWORD_MIN_LENGTH = 6;
      const isEmailValid = emailRegex.test(email);
      const isPasswordValid = password.length > PASSWORD_MIN_LENGTH;
      console.log('Checando');
      if (isEmailValid && isPasswordValid) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    validateLogin();
  }, [email, password]);

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
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
