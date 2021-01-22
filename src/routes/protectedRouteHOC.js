/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

const protectedRoute = (Comp, route = '/sigin') => (props) => {
  const history = useHistory();
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (err) {
      history.push(route);
    }
  }
  useEffect(() => {
    checkAuthState();
  });
  return <Comp {...props} />;
};

export default protectedRoute;
