import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './RecordAutomaticSubtitleFile.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Form, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import {DEFAULT_LANGUAGE_MODELS, DEFAULT_LANGUAGES} from '../../Constants.js';
import HelpDialog from "../dialog/HelpDialog";

const RecordAutomaticSubtitle = ({ onChange, message, disabled = false, value = {} }) => {
    const { t } = useTranslation();
    const id = useId();
    const empty = '';
  console.log(value);
    
    const handleChange = (what, fieldValue) => {
      const newValue = { ...value, [what]: fieldValue };
      onChange(newValue);
    };

    const language_models = [
        empty,
        ...DEFAULT_LANGUAGE_MODELS
    ];

    const languages = [
        empty,
        ...DEFAULT_LANGUAGES
    ];

    const asLanguageModelOption = (language_model) => {
        if (language_model) {
            return { value: language_model, label: t(language_model) };
        }
        return { value: '', label: t('record_automatic_subtitle_default_language_model') };
    };
    const asLanguageOption = (language) => {
        if (language) {
            return { value: language, label: t(language) };
        }
        return { value: '', label: t('record_automatic_subtitle_default_language') };
    };
  

    return (
        <Container className="px-0 mb-3">
            <Row className="mb-3">
                <Col>
                    <HelpDialog label={t('record_automatic_subtitle_help_header_label')} >
                        {t('record_automatic_subtitle_help_header_label_content')}
                    </HelpDialog>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormElementHeader componentId={id}>{t('record_automatic_subtitle_language_model_header')}</FormElementHeader>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <HelpDialog label={t('record_automatic_subtitle_help_label')} >
                        {t('record_automatic_subtitle_help_label_content')}
                    </HelpDialog>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropDown id={id} value={value.translationModel} onChange={(e) => handleChange('translationModel', e.target.value)} options={language_models.map(asLanguageModelOption)} message={message} disabled={disabled} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormElementHeader componentId={id}>{t('record_automatic_subtitle_language_header')}</FormElementHeader>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropDown id={id} value={value.translationLanguage} onChange={(e) => handleChange('translationLanguage', e.target.value)} options={languages.map(asLanguageOption)} message={message} disabled={disabled} />
                </Col>
            </Row>
        </Container>
    );
};

RecordAutomaticSubtitle.propTypes = {
    languageModel: PropTypes.string,
    language: PropTypes.string,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default RecordAutomaticSubtitle;
