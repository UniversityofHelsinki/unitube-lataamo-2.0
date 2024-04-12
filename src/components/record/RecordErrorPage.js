import React from 'react';
import PropTypes from 'prop-types';
import './RecordErrorPage.css';
import HyLogo from '../utilities/HyLogo';
import RecordActions from './card/RecordActions';

const RecordErrorPage = ({ helpDialog, record, showActions = false, children }) => {
  return (
    <div className="record-error-page">
      <div className="record-error-page-logo">
        <HyLogo />
      </div>
      <div className="record-error-page-help">
        {helpDialog}
      </div>
      <div className="record-error-page-content">
        {children}
      </div>
      <div className="record-error-page-actions">
        {showActions && <RecordActions record={record} disabled={false} />}
      </div>
    </div>
  );
};

RecordErrorPage.propTypes = {
  helpDialog: PropTypes.node.isRequired,
  record: PropTypes.object,
  showActions: PropTypes.bool,
  children: PropTypes.node
};

export default RecordErrorPage;
