import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionPublicity.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import CheckBox from "../../form/CheckBox";
import FormElementHeader from "../../form/FormElementHeader";

const CollectionPublicity = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader label={t('collection_form_publicity_header')}> {t('collection_form_publicity_header')} </FormElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CheckBox
                            type="checkbox"
                            id="collection-publicity-shareable"
                            name="collection-publicity-shareable"
                            label={t('collection_publicity_shareable')}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CheckBox
                            type="checkbox"
                            id="collection-publicity-public"
                            name="collection-publicity-public"
                            label={t('collection_publicity_public')}
                        />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

CollectionPublicity.propTypes = {

};

export default CollectionPublicity;
