import React, { useId } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import { ReactComponent as CopyIcon } from '../utilities/icons/copy.svg';
import { Button } from 'react-bootstrap';
import useClipboard from '../../hooks/useClipboard';
import ElementHeader from './ElementHeader';

const ClipBoardFormElement = ({ label, content, children, buttonAriaLabel }) => {
    const { t } = useTranslation();
    const [copy] = useClipboard();
    const labelId = useId();

    return (
        <Container>
            <Row className="align-items-center">
                <Col>
                  <ElementHeader>{label}</ElementHeader>
                </Col>
                <Col className="text-end pe-0">
                  <Button variant="link" aria-label={buttonAriaLabel} onClick={() => copy(content)}>
                    <CopyIcon width="1.5em" height="1.5em" />
                    <span id={labelId} className="ms-2">{t('clipboard_copy')}</span>
                  </Button>
                </Col>
            </Row>
            <Row>
              <Col>
                {children}
              </Col>
            </Row>
        </Container>
    );
};

ClipBoardFormElement.propTypes = {
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    children: PropTypes.object,
    buttonAriaLabel: PropTypes.string.isRequired
};

export default ClipBoardFormElement;
