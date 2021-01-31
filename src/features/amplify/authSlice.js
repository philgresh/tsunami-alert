/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
export const FETCH_USER_DATA_INIT = 'FETCH_USER_DATA_INIT';
export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const RESET_USER_DATA = 'RESET_USER_DATA';

export const initialState = Object.freeze({
  isLoading: true,
  isError: false,
  user: null,
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthState: (state, action) => {
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
    }
  },
});

export const { changeAuthState } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to` select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default authSlice.reducer;
