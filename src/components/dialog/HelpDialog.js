import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './HelpDialog.css';
import Dialog from './Dialog';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HelpDialog = ({ label, children }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const showDialog = () => setShow(true);
  const hideDialog = () => setShow(false);
  
  const headerId = useId();

  const showLink = <Button variant="link" onClick={showDialog} className="p-0">{label}</Button>;

  const header = label;

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
