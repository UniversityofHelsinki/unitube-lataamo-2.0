import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import Message from './Message';
import './DropDown.css';

const DropDown = ({ options, message, ...rest }) => {
    return (
      <>
        <Form.Select { ...rest }>
            {options.map(option => 
              <option key={option.value} value={option.value}>{option.label}</option>
            )}
        </Form.Select>
        <Message type={message?.type}>
          {message?.content}
        </Message>
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
