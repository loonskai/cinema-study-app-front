import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from './redux/store';
import actions from './redux/actions';
import Layout from './Layout';

interface Props {
  validateToken: (token: string) => boolean;
  loadAllSeats: (dispatch?: any) => Promise<void>;
  loadMoviesList: (dispatch?: any) => Promise<void>;
  loadSessionsList: (dispatch?: any) => Promise<void>;
}

const App: React.FC<Props> = ({
  validateToken,
  loadMoviesList,
  loadSessionsList
}) => {
  useEffect(() => {
    const token: string | null = sessionStorage.getItem('accessToken');
    if (token) {
      validateToken(token);
    }
    loadMoviesList();
    loadSessionsList();
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
)(App as any);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);

export default App;
