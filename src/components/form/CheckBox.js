import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import './CheckBox.css';
import { useRef } from 'react';
import { useEffect } from 'react';

const CheckBox = ({ indeterminate, ...rest }) => {
    const ref = useRef();

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
        <Form.Check ref={ref} type="checkbox" { ...rest } />
    );
}

CheckBox.propTypes = {
  indeterminate: PropTypes.bool,
};

export default CheckBox;
