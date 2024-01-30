import React from 'react';
import PropTypes from 'prop-types';
import './RecordCollections.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Form, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import useCollections from "../../hooks/useCollections";

const RecordCollections = ({ onChange, message, disabled = false }) => {
    const { t } = useTranslation();

    const [collections, loadingCollections] = useCollections({
        load: true
    });

    const asOption = (collection) => {
        if (collection) {
            return { value: collection.identifier, label: collection.title };
        }
        return { value: '', label: t('record_collection_select_default') };
    };

    const addEmptyCollection = () => {
        if (!loadingCollections) {
            return [{value: '', label: '', identifier: '0'}, ...collections];
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <FormElementHeader>{t('record_collection_header')}</FormElementHeader>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropDown onChange={(e) => onChange(e.target.value)}  options={(addEmptyCollection() || []).map(asOption)} message={message} disabled={disabled} />
                </Col>
            </Row>
        </Container>
    );
};

RecordCollections.propTypes = {
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default RecordCollections;
