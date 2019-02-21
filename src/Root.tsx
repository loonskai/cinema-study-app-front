import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';

const Root = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
};

export default Root;
