/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';

const AUTH_REDIRECT_PATH = '/app';
const PROTECTED_REDIRECT_PATH = '/signin';

const AuthPage = ({
  component: Component,
  path,
  authState,
  exact,
  redirectPath,
  ...rest
}) => {
  const isSignedIn = authState.user ?? false;
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isSignedIn ? (
          <Redirect to={redirectPath} />
        ) : (
          <Component {...props} {...rest} />
        )
      }
    />
  );
};

const Protected = ({
  component: Component,
  path,
  authState,
  exact,
  redirectPath,
  ...rest
}) => {
  const isSignedIn = authState.user ?? false;

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        isSignedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={redirectPath} {...props} />
        )
      }
    />
  );
};

AuthPage.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  path: PropTypes.string.isRequired,
  authState: PropTypes.shape({
    user: PropTypes.object,
  }),
  exact: PropTypes.bool,
  redirectPath: PropTypes.string,
  history: PropTypes.object,
};

AuthPage.defaultProps = {
  exact: false,
  redirectPath: AUTH_REDIRECT_PATH,
  authState: null,
  history: null,
};

Protected.defaultProps = {
  ...AuthPage.defaultProps,
  redirectPath: PROTECTED_REDIRECT_PATH,
};

Protected.propTypes = AuthPage.propTypes;

export const AuthRoute = withRouter(AuthPage);
export const ProtectedRoute = withRouter(Protected);
