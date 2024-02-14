import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

const ProgressBar = ({ now, label, alertMessage, type, ...rest }) => {
  const id = useId();
  return (<>
        <BootstrapProgressBar className={`form-progress-bar ${type}`} now={now} label={`${now} %`} { ...rest } aria-labelledby={id} />
        <div className="form-progress-bar-information text-center">
          <span id={id}>
            {label}
          </span>
        </div>
        {alertMessage}
    </>
  );
};

ProgressBar.propTypes = {
  now: PropTypes.number.isRequired,
  label: PropTypes.string,
  alertMessage: PropTypes.any,
  variant: PropTypes.string
};

export default ProgressBar;
