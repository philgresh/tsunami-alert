/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { useHistory } from 'react-router-dom';
import { useDeepEffect } from '../utils';

const UserContext = createContext({
  user: null,
  loading: true,
  authState: null,
});
const UserConsumer = UserContext.Consumer;

// /**
//  * @typedef {Object} userContext
//  * @property {Object} user - Firebase auth object.
//  * @property {Bool} loading - Is Auth state changing.
//  * @property {Object} profile - Firestore-based profile.
//  */

/**
 * Wrapper component for Auth-provided user info
 */
const UserProvider = ({ children }) => {
  const history = useHistory();
  const [authState, setAuthState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('usercontainer useeffect');
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      setLoading(false);
      if (nextAuthState === AuthState.SignedOut) history.push('/signin');
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, authState }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default UserContext;
export { UserProvider, UserConsumer, useUser };
