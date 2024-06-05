import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardAction.css';
import HyButton from '../../utilities/HyButton';

const RecordCardAction = ({ icon, label, variant = 'primary', onClick, showLabel = true, disabled = false, opensDialog = false, ariaLabel, title = '' }) => {

  const ariaDialog = (() => {
    if (opensDialog) {
      return { 'aria-haspopup': 'dialog' }
    }
    return {};
  })();

  const onButtonClick = (event) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <HyButton variant={variant} onClick={onButtonClick} aria-label={ariaLabel || label} title={title} disabled={disabled} { ...ariaDialog } leftIcon={icon} mini>
      <span>{showLabel && label}</span>
    </HyButton>
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
    'primary', 'secondary', 'danger'
  ])
};

export default RecordCardAction;
