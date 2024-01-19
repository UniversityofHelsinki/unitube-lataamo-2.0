import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionName.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import InputField from "../../form/InputField";
import FormElementHeader from "../../form/FormElementHeader";

const CollectionName = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader label={t('collection_form_name_header')}> {t('collection_form_name_header')} </FormElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField label={t('aaa')} placeholder={t('collection_form_name_placeholder')}/>
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

CollectionName.propTypes = {

};

export default CollectionName;
