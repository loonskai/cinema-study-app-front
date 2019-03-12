import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './redux/store';
import actions from './redux/actions';
import Layout from './Layout';

const App = ({ validateToken, loadAllSeats }: any) => {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      validateToken(token);
    }
    loadAllSeats();
  }, []);

  return (
    <CssBaseline>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CssBaseline>
  );
};

const ConnectedApp = connect(
  null,
  actions
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
