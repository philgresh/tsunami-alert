/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import useAmplifyAuth from './utils/useAmplifyAuth';
import { ProtectedRoute } from './routes/routeHelpers';
import FourOhFour from './pages/404';
import NavBar from './navbar';
import SignIn from './pages/signin';
import Splash from './pages/splash';
import AddPhone from './pages/phone/addPhone/AddPhone';

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
      <CssBaseline />
      <NavBar handleSignout={handleSignout} authState={authState} />
      <Switch>
        <Route exact path="/app/phones/add">
          <AddPhone />
        </Route>
        <Route exact path="/signin">
          <SignIn handleSignIn={handleSignIn} />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

// {/* {!(authState && user) ? (
//   <Switch>
//     <Route exact path="/" component={Splash} />
//     <Route exact path="/signin">
//       <SignIn handleSignIn={handleSignIn} />
//     </Route>
//   </Switch>
// ) : ( */}
// {/* <Route exact path="/">
//       <Redirect to="/app" />
//     </Route>
//     <Route exact path="/signin">
//       <Redirect to="/app" />
//     </Route> */}
// {/* <Route exact path="/signin">
//     <SignIn handleSignIn={handleSignIn} />
//   </Route> */}
// {/* <ProtectedRoute
//       exact
//       path="/app"
//       history={history}
//       component={() => <pre>{JSON.stringify(user, null, 2)}</pre>}
//       authState={authState}
//     /> */}

// {/* <Route path="/*">
//     <FourOhFour />
//   </Route> */}
// {/* )} */}

export default Router;
