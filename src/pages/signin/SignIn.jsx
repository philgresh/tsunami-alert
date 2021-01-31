/* eslint-disable react/prop-types */
import React from 'react';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

const SignIn = ({ handleSignIn }) => {
  return (
    <AmplifyAuthenticator
      usernameAlias="email"
      handleAuthStateChange={handleSignIn}
    />
  );
};
export default SignIn;
