import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import FormElementHeader from "../form/FormElementHeader";
import PropTypes from "prop-types";

const ClipBoardFormHeader = ({label, size}) => {
    const { t } = useTranslation();

    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader label={label} size={size} />
                </Col>
                <Col> Kopioi </Col>
            </Row>
        </Container>
    );
};

ClipBoardFormHeader.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
}

export default ClipBoardFormHeader;
