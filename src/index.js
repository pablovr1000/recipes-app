import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipesProvider from './context/RecipesProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
