import React, { memo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteOptionContainer from './AutoCompleteOptionContainer';
import { Col, Container, Row } from 'react-bootstrap';
import './AutoComplete.css';
import InputField from '../InputField';

const AutoComplete = ({ options = [], onFilter, onSelect, placeholder, ariaLabel, disabled }) => {
  const [typedValue, setTypedValue] = useState('');
  const [focus, setFocus] = useState(false);
  const containerRef = useRef();
  const typeTimeoutId = useRef();

  const handleInput = (event) => {
    const newValue = (event.target.value || '');
    setTypedValue(newValue);
    if (typeTimeoutId.current) {
      clearTimeout(typeTimeoutId.current);
    }
    typeTimeoutId.current = setTimeout(() => {
      onFilter(newValue);
    }, 500);
  };

  const clearOnSelect = (optionIndex) => {
    setTypedValue('');
    onSelect(optionIndex);
  };

  return (
    <Container ref={containerRef} className="auto-complete px-0" onBlur={
      e => setFocus(containerRef.current?.contains(e.relatedTarget))
    } onFocus={(e => setFocus(true))}>
      <Row>
        <Col>
          <InputField 
            aria-label={ariaLabel} 
            placeholder={placeholder} 
            type="search" value={typedValue} 
            onChange={handleInput} 
            disabled={disabled} 
            message={{}}
            hideMessage={true}
          />
          <AutoCompleteOptionContainer options={options} show={options.length > 0 && focus} onSelect={clearOnSelect} />
        </Col>
      </Row>
    </Container>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default AutoComplete;
