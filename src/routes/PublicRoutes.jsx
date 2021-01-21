import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
} from '@aws-amplify/ui-react';
import Splash from '../pages/splash';
import FourOhFour from '../pages/404';

const PublicRoutes = () => (
  <Switch>
    <Route path="/signin">
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn
          slot="sign-in"
          formFields={[{ type: 'email' }, { type: 'password' }]}
          usernameAlias="email"
        />
        <AmplifySignUp
          slot="sign-up"
          formFields={[{ type: 'email' }, { type: 'password' }]}
          usernameAlias="email"
        />
      </AmplifyAuthenticator>
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
