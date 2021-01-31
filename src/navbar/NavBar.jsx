/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { checkAuthState } from '../routes/protected/protectedRoute';

const NavBar = (props) => {
  const { current } = props;
  const history = useHistory();

  const auth = checkAuthState(history);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">{current}</Link>
        </li>
        <li>
          <Link to="/protected">Protected</Link>
        </li>
        {auth && (
          <li>
            <AmplifySignOut />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
