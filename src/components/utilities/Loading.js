import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ children, loading }) => {
  if (loading) {
    return (
      <div>I will spin over my children until loading is done.</div>
    );
  }
  return (
    children
  );
};

Loading.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Loading;
