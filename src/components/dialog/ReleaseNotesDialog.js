import React, {useId, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Dialog from './Dialog';
import './HelpDialog.css';

const ReleaseNotesDialog = ({ label, releaseNotes }) => {
    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    const headerId = useId();

    const hideDialog = () => setShow(false);
    const toggle = () => setShow(!show);

    const showLink = <Button variant="link" onClick={toggle} className="p-0 help-dialog-button" aria-haspopup="dialog">{label}</Button>;

    return (
        <Dialog showComponent={showLink} show={show} hide={hideDialog} aria-labelledby={headerId}>
            <Modal.Header id={headerId} closeButton closeLabel={t('help_dialog_close_label')} >
                {label}
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            {releaseNotes}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Dialog>
    );
};

ReleaseNotesDialog.propTypes = {
    label: PropTypes.string.isRequired,
    releaseNotes: PropTypes.array,
};

export default ReleaseNotesDialog;
