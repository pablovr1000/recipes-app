import React from 'react';

export default function Login() {
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
        />
        <input
          className="inputPassword"
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
        />
        <button
          className="buttonLogin"
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
