import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Root from './Root';

ReactDOM.render(
  <CssBaseline>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </CssBaseline>,
  document.getElementById('root')
);
