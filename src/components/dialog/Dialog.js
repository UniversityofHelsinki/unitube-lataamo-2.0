import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';
import { Modal } from 'react-bootstrap';

const Dialog = ({
  showComponent, 
  show, 
  hide,
  children,
  closeable = true,
  ...rest
}) => {

  const closeableProps = {
    keyboard: closeable,
    backdrop: closeable || 'static'
  };

  return (
    <>
      {showComponent}
      <Modal 
          show={show} 
          onHide={hide} 
          centered 
          fullscreen="md-down"
          { ...closeableProps }
          { ...rest }>
        {children}
      </Modal>
    </>
  );
};

Dialog.propTypes = {
  showComponent: PropTypes.object,
  show: PropTypes.bool,
  hide: PropTypes.func,
  children: PropTypes.any,
  closeable: PropTypes.bool,
};

export default Dialog;
