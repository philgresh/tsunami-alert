/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

async function checkAuthState(history, route = '/signin') {
  try {
    const auth = await Auth.currentAuthenticatedUser();
    return auth;
  } catch (err) {
    history.push(route);
    return null;
  }
}

const protectedRoute = (Comp, route = '/signin') => (props) => {
  const history = useHistory();
  checkAuthState(history, route);
  useEffect(() => {
    checkAuthState();
  }, []);
  return <Comp {...props} />;
};

export default protectedRoute;
export { checkAuthState };
