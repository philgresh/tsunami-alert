/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
  useHistory,
} from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import useAmplifyAuth from './utils/useAmplifyAuth';
import { AuthRoute, ProtectedRoute } from './routes/routeHelpers';
import FourOhFour from './pages/404';
import NavBar from './navbar';
import SignIn from './pages/signin';
import Splash from './pages/splash';

export const UserContext = React.createContext();

const Router = () => {
  const history = useHistory();
  const {
    authState,
    authState: { user },
    handleSignout,
    handleSignIn,
  } = useAmplifyAuth(history);

  return (
    <UserContext.Provider value={{ user }}>
      {user && (
        <button type="button" onClick={handleSignout}>
          Sign Out
        </button>
      )}
      <Switch>
        {authState && user ? (
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>
        ) : (
          <Route exact path="/" component={Splash} />
        )}
        {
          // This is bullshit but whatever
        }
        {authState && user ? (
          <Route exact path="/signin">
            <Redirect to="/app" />
          </Route>
        ) : (
          <Route exact path="/signin">
            <SignIn handleSignIn={handleSignIn} />
          </Route>
        )}
        <ProtectedRoute
          exact
          path="/app"
          history={history}
          component={() => <pre>{JSON.stringify(user, null, 2)}</pre>}
          authState={authState}
        />

        <Route path="/*">
          <FourOhFour />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default Router;
