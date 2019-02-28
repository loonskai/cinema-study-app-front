import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './redux/store';
import Layout from './Layout';

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CssBaseline>
  </Provider>,
  document.getElementById('root')
);
