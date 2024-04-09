import React from 'react';
import PropTypes from 'prop-types';
import './CollectionErrorPage.css';
import HyLogo from '../utilities/HyLogo';

const CollectionErrorPage = ({ children, helpDialog }) => {
  return (
    <div className="collection-error-page">
      <div className="collection-error-page-logo">
        <HyLogo />
      </div>
      <div className="collection-error-page-help">
        {helpDialog}
      </div>
      <div className="collection-error-page-content">
        {children}
      </div>
    </div>
  );
};

CollectionErrorPage.propTypes = {
  children: PropTypes.node,
  helpDialog: PropTypes.node
};

export default CollectionErrorPage;
