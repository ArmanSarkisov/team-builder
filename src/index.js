import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// styles
import './index.css';
import 'semantic-ui-css/semantic.min.css'

// components
import App from './App';

import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

