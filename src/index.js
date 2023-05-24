import React from 'react';
import ReactDOM from 'react-dom/client';
import Desktop from './Desktop';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Desktop/>
    </Provider>
  </React.StrictMode>
);