import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";

const RecordDownLoadLinks = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader label={t('record_download_links_header')} size={'h5'} />
                </Col>
            </Row>
        </Container>
    );
};

RecordDownLoadLinks.propTypes = {
};

export default RecordDownLoadLinks;
