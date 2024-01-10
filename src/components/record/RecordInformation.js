import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";
import TextArea from "../form/TextArea";

const RecordInformation = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader label={t('recordinformation')} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextArea />
                </Col>
            </Row>
        </Container>
    );
};

RecordInformation.propTypes = {
};

export default RecordInformation;
