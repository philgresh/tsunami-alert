import React from 'react';

const styles = {
  container: {
    margin: '0 auto',
    padding: '50px 100px',
  },
};

function Public() {
  return (
    <div style={styles.container}>
      <h1>Public route</h1>
    </div>
  );
}

export default Public;
