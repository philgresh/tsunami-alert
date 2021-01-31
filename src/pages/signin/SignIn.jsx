/* eslint-disable react/prop-types */
import React from 'react';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

const SignIn = ({ handleSignIn }) => {
  return (
    <div>
      <h1>SIGN IN!</h1>
      <AmplifyAuthenticator
        usernameAlias="email"
        handleAuthStateChange={handleSignIn}
      />
    </div>
  );
};
export default SignIn;
