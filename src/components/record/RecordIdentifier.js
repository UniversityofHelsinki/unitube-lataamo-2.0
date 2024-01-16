import React from 'react';
import { useTranslation } from 'react-i18next';
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

const RecordIdentifier = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Row>
                <Col>
                    <ClipBoardFormElement label={t('record_identifier_header')} size={'h5'} />
                </Col>
            </Row>
            <Row>
                <Col>
                    45ce69e0-1793-4494-8674-fff6d48f4a2f
                </Col>
            </Row>
        </Container>
    );
};

RecordIdentifier.propTypes = {
};

export default RecordIdentifier;
