import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AutoCompleteOptionContainer from './AutoCompleteOptionContainer';
import { Col, Container, Row } from 'react-bootstrap';
import './AutoComplete.css';
import InputField from '../InputField';

const AutoComplete = ({ options = [], onFilter, onSelect = console.log }) => {
  const [typedValue, setTypedValue] = useState('');
  const show = typedValue.length > 0;

  const handleInput = (event) => {
    const newValue = (event.target.value || '').trim();
    setTypedValue(newValue);
    onFilter(typedValue);
  };

  const clearOnSelect = (option) => {
    setTypedValue('');
    onSelect(option);
  };

  return (
    <Container className="auto-complete">
      <Row>
        <Col>
          <InputField placeholder="" type="search" value={typedValue} onChange={handleInput} />
          <AutoCompleteOptionContainer options={options} show={show} onSelect={clearOnSelect} />
        </Col>
      </Row>
    </Container>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
};

export default AutoComplete;
