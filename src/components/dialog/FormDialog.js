import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './FormDialog.css';
import Dialog from './Dialog';

const beforeUnloadConfirmation = (event) => {
  event.preventDefault();
};

const FormDialog = ({
  touched = false,
  show = false,
  hide,
  closeable = true,
  showComponent,
  children,
  ...rest
}) => {

  useEffect(() => {
    if (!touched && !show) {
      window.removeEventListener("beforeunload", beforeUnloadConfirmation);
    } else if (touched) {
      window.addEventListener("beforeunload", beforeUnloadConfirmation);
    }
  }, [touched, show]);

  return (
    <Dialog showComponent={showComponent} show={show} hide={hide} closeable={closeable} size="lg" fullscreen="sm-down" { ...rest }>
      {children}
    </Dialog>
  );
};

FormDialog.propTypes = {
  touched: PropTypes.bool,
  show: PropTypes.bool,
  hide: PropTypes.func,
  closeable: PropTypes.bool,
  showComponent: PropTypes.any,
  children: PropTypes.node
};

export default FormDialog;
