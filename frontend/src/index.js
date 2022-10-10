import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import { store } from './store.js';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>, 
);
