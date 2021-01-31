/* eslint-disable import/prefer-default-export */
const jwtDecode = require('jwt-decode');

/**
 * helper method to validate  user token
 *
 * @param {*} token
 * @returns {boolean}
 */
export const validateToken = (token) => {
  if (!token) {
    return false;
  }
  try {
    const decodedJwt = jwtDecode(token);
    return decodedJwt.exp >= Date.now() / 1000;
  } catch (e) {
    return false;
  }
};
