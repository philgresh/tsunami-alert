/* eslint-disable no-debugger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useUser } from '../containers/UserContainer';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children: Children, ...rest }) => {
  // const checkUserAuth = validateToken(
  //   localStorage.getItem(AUTH_USER_TOKEN_KEY),
  // );
  const { user } = useUser();
  const history = useHistory();
  console.log(history, user);
  debugger;
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Children {...props} user={user} />
        ) : (
          <Redirect
            to={{
              pathname: `/signin?redirect=${history.location.pathname.slice(
                1,
              )}`,
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
