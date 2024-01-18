import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteOptionContainer from './AutoCompleteOptionContainer';
import { Col, Container, Row } from 'react-bootstrap';
import './AutoComplete.css';
import InputField from '../InputField';

const AutoComplete = ({ options = [], onFilter, onSelect = console.log, placeholder }) => {
  const [typedValue, setTypedValue] = useState('');
  const [focus, setFocus] = useState(false);
  const containerRef = useRef();

  const handleInput = (event) => {
    const newValue = (event.target.value || '');
    setTypedValue(newValue);
    onFilter(newValue);
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
          <InputField placeholder={placeholder} type="search" value={typedValue} onChange={handleInput} />
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
  placeholder: PropTypes.string.isRequired
};

export default AutoComplete;
