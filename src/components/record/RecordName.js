import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import InputField from "../form/InputField";

const RecordName = () => {
    const { t } = useTranslation();
    return (
        <Container>
            <Row>
                <Col>
                    <output id='recordnameheader' type="text">{t('recordname')} </output>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField />
                </Col>
            </Row>
        </Container>
    );
};

RecordName.propTypes = {
};

export default RecordName;
