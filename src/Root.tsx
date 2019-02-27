import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Movies from './pages/Movies';

const Root = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/movies" component={Movies} />
    </Switch>
  );
};

export default Root;
