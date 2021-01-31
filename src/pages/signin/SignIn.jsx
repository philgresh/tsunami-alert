/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

const SignIn = ({ onUserSignIn }) => {
  const history = useHistory();

  return (
    <div>
      <h1>SIGN INNNNNNNNNNN!</h1>
      <AmplifyAuthenticator
        usernameAlias="email"
        handleAuthStateChange={onUserSignIn}
      />
    </div>
  );
};

SignIn.propTypes = {};

export default SignIn;
