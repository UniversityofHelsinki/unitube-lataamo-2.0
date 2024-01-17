import React, { useId } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import FormElementHeader from './FormElementHeader';
import { ReactComponent as CopyIcon } from '../utilities/icons/copy.svg';
import { Button } from 'react-bootstrap';
import useClipboard from '../../hooks/useClipboard';

const ClipBoardFormElement = ({ label, content, children }) => {
    const { t } = useTranslation();
    const [copy] = useClipboard();
    const labelId = useId();

    return (
        <Container>
            <Row>
                <Col sm={5}>
                  <FormElementHeader label={label} />
                </Col>
                <Col>
                  <Button variant="link" aria-labelledby={labelId} onClick={() => copy(content)}>
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
};

export default ClipBoardFormElement;
