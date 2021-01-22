/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import Auth from '@aws-amplify/auth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const isAuthenticated = async () => {
  try {
    return await Auth.currentSession().isValid();
  } catch (error) {
    return false;
  }
};

export default function PrivateRoute({ children, ...rest }) {
  const isAuthed = isAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
