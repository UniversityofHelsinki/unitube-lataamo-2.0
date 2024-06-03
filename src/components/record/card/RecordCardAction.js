import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardAction.css';
import { Button } from 'react-bootstrap';

const RecordCardAction = ({ icon, label, variant = 'outline-primary', onClick, showLabel = true, disabled = false, opensDialog = false, ariaLabel }) => {

  const marginClass = (() => {
    if (showLabel) {
      return 'me-1';
    }
    return '';
  })();

  const ariaDialog = (() => {
    if (opensDialog) {
      return { 'aria-haspopup': 'dialog' }
    }
    return {};
  })();

  return (
    <Button size="sm" variant={variant} onClick={onClick} className="record-card-action p-0 m-0" aria-label={ariaLabel || label} disabled={disabled} { ...ariaDialog }>
      <span className={`${marginClass} record-card-action-icon-${variant}`}>{icon}</span>
      <span>{showLabel && label}</span>
    </Button>
  );
};

RecordCardAction.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  opensDialog: PropTypes.bool,
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'link',
    'outline-primary', 'outline-secondary', 'outline-success', 'outline-warning', 'outline-danger', 'outline-info', 'outline-light', 'outline-dark', 'outline-link'

  ])
};

export default RecordCardAction;
