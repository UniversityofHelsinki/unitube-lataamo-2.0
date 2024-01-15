import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";
import TextArea from "../form/TextArea";
import { Form } from 'react-bootstrap';
import './RecordDescription.css';

const RecordInformation = () => {
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
                    <TextArea />
                </Col>
            </Row>
            </Form.Group>
        </Container>
    );
};

RecordInformation.propTypes = {
};

export default RecordInformation;
