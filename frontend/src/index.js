import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.js';
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n.js';
import runApp from './init.js';

runApp();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
