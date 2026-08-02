import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './GLOBAL/redux/store';
import AppWrapper from './AppWrapper';
import './styles/base.scss';

console.log('[index] booting Excel Vaults client');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
);
