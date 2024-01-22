import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './FormDialog.css';
import Dialog from './Dialog';

const beforeUnloadConfirmation = (event) => {
  event.preventDefault();
};

const listenerIsNotYetSet = () =>
  window.onbeforeunload !== beforeUnloadConfirmation;

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
    if (touched && listenerIsNotYetSet()) {
      window.onbeforeunload = beforeUnloadConfirmation;
    }

    return () => {
      if (touched) {
        window.removeEventListener('beforeunload', beforeUnloadConfirmation);
      }
    };
  }, [touched]);

  return (
    <Dialog showComponent={showComponent} show={show} hide={hide} closeable={closeable} { ...rest }>
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
  children: PropTypes.any
};

export default FormDialog;
