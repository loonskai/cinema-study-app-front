import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Movies from './pages/Movies';
import Auth from './pages/Auth';
import MovieSingle from './pages/MovieSingle';
import UserProfile from './pages/UserProfile';
import SessionSingle from './pages/SessionSingle';

const Root = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/movies" component={Movies} />
    <Route path="/movies/:id" component={MovieSingle} />
    <Route path="/auth" component={Auth} />
    <Route path="/profile" component={UserProfile} />
    <Route path="/sessions/:id" component={SessionSingle} />
  </Switch>
);

export default Root;
