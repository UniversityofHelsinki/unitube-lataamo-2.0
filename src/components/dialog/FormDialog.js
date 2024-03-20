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
  const dialogRef = useRef();
  const focusSetRef = useRef(false);
  const focusSet = focusSetRef.current;

  useEffect(() => {
    if (!touched && !show) {
      window.removeEventListener("beforeunload", beforeUnloadConfirmation);
      focusSetRef.current = false;
    } else if (touched) {
      window.addEventListener("beforeunload", beforeUnloadConfirmation);
    }

    const dialogElement = dialogRef.current?.dialog;
    if (show && dialogElement && !focusSet) {
      const firstInputElement = dialogElement.querySelector("input:enabled");
      const firstFocusableElement = dialogElement.querySelector("*:enabled");
      if (firstInputElement) {
        firstInputElement.focus();
        focusSetRef.current = true;
      } else if (firstFocusableElement) {
        firstFocusableElement.focus();
        focusSetRef.current = true;
      }
    }

  }, [touched, show]);

  return (
    <Dialog ref={dialogRef} showComponent={showComponent} show={show} hide={hide} closeable={closeable} size="lg" fullscreen="sm-down" { ...rest }>
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
