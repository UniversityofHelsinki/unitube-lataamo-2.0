import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import InputField from "../form/InputField";
import FormElementHeader from "../form/FormElementHeader";
import { Form } from 'react-bootstrap';

const RecordName = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader label={t('recordname')} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

RecordName.propTypes = {
};

export default RecordName;
