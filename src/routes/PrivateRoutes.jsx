/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState } from '@aws-amplify/ui-components';
import Home from '../pages/home';
import FourOhFour from '../pages/404';

const PrivateRoutes = ({ user, authState }) => {
  const history = useHistory();
  useEffect(() => {
    if (authState === AuthState.SignedIn) history.push('/');
  }, [authState]);

  const onSignOut = (nextAuthState, data) => {
    console.log('Signing out...', { nextAuthState, data });
  };
  return (
    <>
      <AmplifySignOut handleAuthStateChange={onSignOut} />
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route>
          <FourOhFour />
        </Route>
      </Switch>
    </>
  );
};

PrivateRoutes.propTypes = {
  user: PropTypes.object,
  authState: PropTypes.string,
};

export default PrivateRoutes;
