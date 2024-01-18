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

const RecordName = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader label={t('record_form_name_header')}  size={'h5'} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField placeholder={t('record_form_name_placeholder')}/>
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

RecordName.propTypes = {
};

export default RecordName;
