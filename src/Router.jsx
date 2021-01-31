/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import useAmplifyAuth from './utils/useAmplifyAuth';
import protectedRouteHOC from './routes/protected/protectedRoute';
import FourOhFour from './pages/404';
import NavBar from './navbar';
import SignIn from './pages/signin';
import Splash from './pages/splash';

export const UserContext = React.createContext();

const Router = () => {
  const {
    state: { user },
    handleSignout,
  } = useAmplifyAuth();

  return (
    <UserContext.Provider value={{ user }}>
      {user && (
        <button type="button" onClick={handleSignout}>
          Sign Out
        </button>
      )}
      <Switch>
        {/* Navigation */}
        {/* <Navbar user={user} handleSignout={handleSignout} /> */}
        {/* Routes */}
        {user ? (
          <Route exact path="/">
            <div>
              <h1>Home page (signed in)</h1>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </Route>
        ) : (
          <Route exact path="/" component={Splash} />
        )}
        <Route exact path="/signin" component={AmplifyAuthenticator} />
        <Route exact path="/protected">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Route>
        {/* <Route
              path="/markets/:marketId"
              component={({ match }) => (
                <MarketPage user={user} marketId={match.params.marketId} />
              )}
            /> */}
        <Route path="/*">
          <FourOhFour />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default Router;
