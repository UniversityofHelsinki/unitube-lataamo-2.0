import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';
import HyLogo from './HyLogo';

const Loading = ({ children, renderChildren = false, loading }) => {

  if (loading && renderChildren) {
    return (
      <div className="loading">
        {children}
      </div>
    );
  } else if (loading) {
    return (
      <div className="loading">
        <HyLogo className="spin" />
        <p>Ladataan...</p>
      </div>
    );
  }
  return (
    children
  );
};

Loading.propTypes = {
  children: PropTypes.object.isRequired,
  renderChildren: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Loading;
