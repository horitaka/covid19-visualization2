import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './views/App';
import configureStore from './state/store'
import './index.css'

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
