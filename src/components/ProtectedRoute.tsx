import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuth, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const connectedProtectedRoute: any = connect(({ auth }: { auth: any }) => ({
  isAuth: auth.isAuth
}))(ProtectedRoute);

export default withRouter(connectedProtectedRoute) as any;