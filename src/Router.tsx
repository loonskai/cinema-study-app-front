import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Auth from './pages/Auth';
import MovieSingle from './pages/MovieSingle';
import UserProfile from './pages/UserProfile';
import SessionSingle from './pages/SessionSingle';
import Admin from './pages/Admin';

const Router = () => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route exact={true} path="/movies" component={Movies} />
    <Route path="/movies/:id" component={MovieSingle} />
    <Route path="/auth" component={Auth} />
    <ProtectedRoute path="/profile" component={UserProfile} />
    <ProtectedRoute path="/sessions/:id" component={SessionSingle} />
    <ProtectedRoute path="/admin" admin={true} component={Admin} />
  </Switch>
);

export default Router;