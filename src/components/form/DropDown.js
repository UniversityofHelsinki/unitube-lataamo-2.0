import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";

const DropDown = ({ options, message, ...rest }) => {
  const messageType = ({
    'light': 'text-secondary',
    'neutral': '',
    'warning': 'text-danger'
  })[message?.type];

    return (
      <>
        <Form.Select { ...rest }>
            {options.map(option => 
              <option key={option.value} value={option.value}>{option.label}</option>
            )}
        </Form.Select>
        <Form.Text className={messageType}>{message?.content}</Form.Text>
      </>
    );
}

DropDown.propTypes= {
    options: PropTypes.array.isRequired,
    message: PropTypes.shape({
      content: PropTypes.string,
      type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    })
};
export default DropDown;
