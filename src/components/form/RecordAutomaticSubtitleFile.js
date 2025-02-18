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
    const languageModelHeaderId = useId();
    const languageHeaderId = useId();
    const empty = '';
    
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
  

    const validationMessages = (type) => {
      if (message?.content) {
        return {
          content: message.content[type],
          type: 'warning'
        };
      }
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
                    <FormElementHeader 
                      id={languageModelHeaderId}
                      helpDialog={(
                        <HelpDialog label={t('record_automatic_subtitle_help_label')} >
                          {t('record_automatic_subtitle_help_label_content')}
                        </HelpDialog>
                      )}
                    >
                      {t('record_automatic_subtitle_language_model_header')}
                    </FormElementHeader>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropDown aria-labelledby={languageModelHeaderId} aria-required value={value.translationModel} onChange={(e) => handleChange('translationModel', e.target.value)} options={language_models.map(asLanguageModelOption)} message={validationMessages('translationModel')} disabled={disabled} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormElementHeader id={languageHeaderId}>{t('record_automatic_subtitle_language_header')}</FormElementHeader>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropDown aria-labelledby={languageHeaderId} aria-required value={value.translationLanguage} onChange={(e) => handleChange('translationLanguage', e.target.value)} options={languages.map(asLanguageOption)} message={validationMessages('translationLanguage')} disabled={disabled} />
                </Col>
            </Row>
        </Container>
    );
};

RecordAutomaticSubtitle.propTypes = {
    languageModel: PropTypes.string,
    language: PropTypes.string,
    message: PropTypes.shape({
        content: PropTypes.object,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default RecordAutomaticSubtitle;
