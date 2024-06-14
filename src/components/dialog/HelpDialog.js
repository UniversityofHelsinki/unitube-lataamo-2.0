import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './HelpDialog.css';
import Dialog from './Dialog';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoDialog } from '../utilities/icons/info-dialog.svg';

const alreadyInDialog = () => {
  const body = document.querySelector('body');
  return body.classList
    .contains('modal-open');
};

const DialogFallback = ({ children, onHide, headerLabel }) => {
  const { t } = useTranslation();
  const headerId = useId();
  const contentId = useId();

  const hide = (e) => {
    e.preventDefault();
    onHide(e);
  };

  return (<div className="help-dialog-fallback" role="dialog" aria-labelledby={headerId} aria-describedby={contentId}>
      <div className="help-dialog-fallback-container">
        <Container>
          <Row className="help-dialog-fallback-header align-items-center">
            <Col>
              <span id={headerId}>{headerLabel}</span>
            </Col>
            <Col className="text-end px-0">
              <Button aria-label={t('close')} variant="link" className="btn-close" onClick={hide} />
            </Col>
          </Row>
          <Row className="help-dialog-fallback-content">
            <Col>
              <p className="my-0" id={contentId}>
                {children}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>)
};

const HelpDialog = ({ label, children }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const hideDialog = () => setShow(false);
  const toggle = () => setShow(!show);
  
  const headerId = useId();

  const showLink = <Button variant="link" onClick={toggle} className="p-0 help-dialog-button" aria-haspopup="dialog" title={label}>
    <InfoDialog width="1.5em" height="1.5em" />
    <span className="mx-1"></span>
    <span>{label}</span>
  </Button>;

  const header = label;

  if (alreadyInDialog()) {
    if (!show) {
      return showLink;
    }

    return (
      <>
        {showLink}
        <DialogFallback onHide={hideDialog} headerLabel={header}>
          {children}
        </DialogFallback>
      </>
    );
  }

  return (
    <Dialog showComponent={showLink} show={show} hide={hideDialog} aria-labelledby={headerId}>
      <Modal.Header id={headerId} closeButton closeLabel={t('help_dialog_close_label')}>
        {header}
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <p>
                {children}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Dialog>
  );
};

HelpDialog.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default HelpDialog;
