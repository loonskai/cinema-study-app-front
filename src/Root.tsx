import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Auth from './pages/Auth';
import MoviePage from './pages/MoviePage';
import UserProfile from './pages/UserProfile';

const Root = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/movies" component={Movies} />
    <Route path="/movies/:id" component={MoviePage} />
    <Route path="/auth" component={Auth} />
    <Route path="/profile" component={UserProfile} />
  </Switch>
);

export default Root;
