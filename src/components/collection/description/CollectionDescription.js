import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionDescription.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import TextArea from "../../form/TextArea";
import FormElementHeader from "../../form/FormElementHeader";

const CollectionDescription = ({ description }) => {
    const { t } = useTranslation();
    const id = useId();

    return (
        <Container className="ps-0">
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader componentId={id}>{t('collection_form_description_header')}</FormElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextArea id={id} value={description} />
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
