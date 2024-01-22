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

const RecordDescription = ({ description, onChange }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
            <Row>
                <Col>
                    <FormElementHeader label={t('record_form_description_header')} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextArea value={description} onChange={onChange} />
                </Col>
            </Row>
            </Form.Group>
        </Container>
    );
};

RecordDescription.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func
};

export default RecordDescription;
