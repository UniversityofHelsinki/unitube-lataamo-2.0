import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './RecordActionOptions.css';
import { useTranslation } from 'react-i18next';
import CheckBox from '../form/CheckBox';

const RecordTags = ({ onOptionChange, options }) => {
    const { t } = useTranslation();
    const onChange = (key) => {
        if (onOptionChange) {
            onOptionChange({
                ...options,
                [key]: !options[key]
            });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    Tägit. Tää on "päätägi". Tän "alle" kaikki tägit, tallenne käsittelyssä, tekstitys käsittelyssä, jne...
                </Col>
            </Row>
        </Container>
    );
};

RecordTags.propTypes = {
};

export default RecordTags;
