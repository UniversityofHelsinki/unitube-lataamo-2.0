import React from 'react';
import PropTypes from 'prop-types';
import './AutoCompleteOptionContainer.css';
import onKeyDown from '../../accessibility/keydown';
import { Col, Container, Row } from 'react-bootstrap';

const AutoCompleteOptionContainer = ({ options, show = false, onSelect }) => {
  const nothing = <></>;
  if (!show) {
    return nothing;
  }

  return (
    <div className="auto-complete-option-container">
      <ul className="auto-complete-option-list" aria-live="polite" aria-atomic="true">
        {options.map((option, i) => 
          <li key={i} tabIndex={0} onClick={() => onSelect(i)} onKeyDown={onKeyDown(() => onSelect(i))}>
            {option}
          </li>
        )}
      </ul>
    </div>
  );
};

AutoCompleteOptionContainer.propTypes = {
  options: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default AutoCompleteOptionContainer;
