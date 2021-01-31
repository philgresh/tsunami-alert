/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
// https://www.rockyourcode.com/custom-react-hook-use-aws-amplify-auth/
import { useReducer, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

const FETCH_USER_DATA_INIT = 'FETCH_USER_DATA_INIT';
const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
const RESET_USER_DATA = 'RESET_USER_DATA';
const REDIRECT_TO_AFTER_SIGNIN = '/app';
const REDIRECT_TO_AFTER_SIGNOUT = '/';

const amplifyAuthReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.user,
      };
    case FETCH_USER_DATA_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case RESET_USER_DATA:
      return { ...state, user: null };
    default:
      throw new Error();
  }
};

const initialState = Object.freeze({
  isLoading: true,
  isError: false,
  user: null,
});

const useAmplifyAuth = (history) => {
  const [authState, dispatch] = useReducer(amplifyAuthReducer, initialState);
  const [triggerFetch, setTriggerFetch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (isMounted) {
        dispatch({ type: FETCH_USER_DATA_INIT });
      }
      try {
        if (isMounted) {
          const data = await Auth.currentAuthenticatedUser();
          if (data) {
            dispatch({
              type: FETCH_USER_DATA_SUCCESS,
              payload: { user: data },
            });
            history.push(REDIRECT_TO_AFTER_SIGNIN);
          }
        }
      } catch (error) {
        if (isMounted) {
          dispatch({ type: FETCH_USER_DATA_FAILURE });
        }
      }
    };

    const HubListener = () => {
      Hub.listen('auth', (data) => {
        const { payload } = data;
        onAuthEvent(payload);
      });
    };

    const onAuthEvent = (payload) => {
      if (payload.event === AuthState.SignIn) {
        if (isMounted) {
          setTriggerFetch(true);
          console.log('signed in');
        }
      }
    };

    HubListener();
    fetchUserData();

    return () => {
      Hub.remove('auth');
      isMounted = false;
    };
  }, [triggerFetch]);

  const handleSignIn = async (nextAuthState, authData) => {
    // console.log(nextAuthState, authData);
    if (nextAuthState === AuthState.SignedIn) {
      // dispatch({
      //   type: FETCH_USER_DATA_SUCCESS,
      //   payload: { user: authData.attributes },
      // });
      setTriggerFetch(true);
      history.push(REDIRECT_TO_AFTER_SIGNIN);
    }
  };

  const handleSignout = async () => {
    try {
      console.log('signed out');
      await Auth.signOut();
      setTriggerFetch(false);
      dispatch({ type: RESET_USER_DATA });
      history.push(REDIRECT_TO_AFTER_SIGNOUT);
    } catch (error) {
      console.error('Error signing out user ', error);
    }
  };

  return { authState, handleSignout, handleSignIn };
};

export default useAmplifyAuth;
