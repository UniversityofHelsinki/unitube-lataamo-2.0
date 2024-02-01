import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";
import TextArea from "../form/TextArea";
import { Form } from 'react-bootstrap';
import PropTypes from "prop-types";
import './RecordDescription.css';
import { useId } from 'react';

const RecordDescription = ({ description, onChange, message, disabled = false }) => {
    const { t } = useTranslation();
    const id = useId();

    return (
        <Container>
            <Form.Group>
            <Row>
                <Col>
                    <FormElementHeader componentId={id}>{t('record_form_description_header')}</FormElementHeader>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextArea id={id} value={description} onChange={(e) => onChange(e.target.value)} message={message} disabled={disabled} />
                </Col>
            </Row>
            </Form.Group>
        </Container>
    );
};

RecordDescription.propTypes = {
    description: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    })
};

export default RecordDescription;
