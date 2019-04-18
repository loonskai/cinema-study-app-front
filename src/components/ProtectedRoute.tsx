import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

interface Props {
  component: React.ReactType;
  admin: boolean;
  isAuth: boolean;
  isAdmin: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  admin,
  isAuth,
  isAdmin,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (admin) {
        return isAuth && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        );
      }
      return isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth',
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

const connectedProtectedRoute: any = connect(({ auth }: { auth: any }) => ({
  isAuth: auth.isAuth,
  isAdmin: auth.isAdmin
}))(ProtectedRoute);

export default withRouter(connectedProtectedRoute) as any;
