/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ user }) => {
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

Home.propTypes = {
  user: PropTypes.object,
};

Home.defaultProps = {
  user: null,
};

export default Home;
