import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionDescription.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import TextArea from "../../form/TextArea";
import FormElementHeader from "../../form/FormElementHeader";

const CollectionDescription = ({ description }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader>{t('collection_form_description_header')}</FormElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextArea value={description} />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

CollectionDescription.propTypes = {
  description: PropTypes.string,
};

export default CollectionDescription;
