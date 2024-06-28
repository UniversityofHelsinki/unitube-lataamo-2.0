import React, {useId} from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './InputField.css';
import Message from './Message';

const InputField = ({ message, hideMessage, ...rest }) => {
  const messageId = useId();
  const isInvalid = !!message?.content;

  const ariaDescribedBy = hideMessage ? {} : { 'aria-describedby': messageId };

  return (
    <>
      <Form.Control type={ rest.type || "text" } aria-invalid={isInvalid} { ...ariaDescribedBy } { ...rest } />
      {!hideMessage && <Message messageId={messageId} type={message?.type}>{message?.content}</Message>}
    </>
  );
};

InputField.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
  hideMessage: PropTypes.bool
};

export default InputField;
