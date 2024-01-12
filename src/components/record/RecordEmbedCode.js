import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";

const RecordEmbedCode = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader label={t('record_embed_code_header')} size={'h5'} />
                </Col>
            </Row>
        </Container>
    );
};

RecordEmbedCode.propTypes = {
};

export default RecordEmbedCode;
