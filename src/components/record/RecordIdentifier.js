import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";

const RecordIdentifier = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader label={t('record_identifier_header')} size={'h5'} />
                </Col>
            </Row>
        </Container>
    );
};

RecordIdentifier.propTypes = {
};

export default RecordIdentifier;
