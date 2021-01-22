import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';
import App from './App';
import store from './app/store';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

// Assuming you have two redirect URIs, and the first is for localhost
// and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth?.redirectSignIn.split(',');

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth?.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure(updatedAwsConfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
