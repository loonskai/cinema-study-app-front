import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout';

ReactDOM.render(
  <CssBaseline>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </CssBaseline>,
  document.getElementById('root')
);
