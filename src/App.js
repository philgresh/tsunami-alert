/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

const AuthStateApp = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.SignedIn) {
        console.log('user successfully signed in!');
        console.log('user data: ', authData);
      }
      if (!authData) {
        console.log('user is not signed in...');
      }
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <PrivateRoutes user={user} authState={authState} />
  ) : (
    <PublicRoutes />
  );
};

export default AuthStateApp;