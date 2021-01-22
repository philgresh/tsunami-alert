import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import Splash from '../pages/splash';
import FourOhFour from '../pages/404';

const PublicRoutes = () => (
  <Switch>
    <Route path="/signin">
      <AmplifyAuthenticator usernameAlias="email" />
    </Route>
    <Route exact path="/">
      <Splash />
    </Route>
    <Route>
      <FourOhFour />
    </Route>
  </Switch>
);

export default PublicRoutes;
