import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import InputField from "../form/InputField";
import FormElementHeader from "../form/FormElementHeader";
import { Form } from 'react-bootstrap';
import PropTypes from "prop-types";
import './RecordName.css';

const RecordName = ({ name, onChange, message }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader>{t('record_form_name_header')}</FormElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField value={name} placeholder={t('record_form_name_placeholder')} onChange={(e) => onChange(e.target.value)} message={message} />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

RecordName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default RecordName;
