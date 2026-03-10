import React, {useEffect, useId, useState} from 'react';
import PropTypes from 'prop-types';
import './RecordAutomaticSubtitleFile.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Form, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import {DEFAULT_LANGUAGE_MODELS, DEFAULT_LANGUAGES} from '../../Constants.js';
import HelpDialog from "../dialog/HelpDialog";
import CheckBox from "./CheckBox";
import Message from "./Message";

const RecordAutomaticSubtitle = ({ onChangeToLanguages, onChange, message, disabled = false, value = {} }) => {
    const { t } = useTranslation();
    const languageModelHeaderId = useId();
    const languageHeaderId = useId();
    const empty = '';
    const allPossibleLanguages = ['fi-FI', 'sv-SE', 'en-US'];
    const [selectedLanguage, setSelectedLanguage] = useState('');
    let [checkBoxes, setCheckBoxes] = useState(allPossibleLanguages.filter(lang => lang !== selectedLanguage));
    const [selectedOption, setSelectedOption] = useState( '');
    const [options, setOptions] = useState([
        {lang: 'fi-FI', isChecked: false},
        {lang: 'sv-SE', isChecked: false},
        {lang: 'en-US', isChecked: false},
    ]);

    useEffect(() => {
        setOptions(options.map(option => ({ ...option, isChecked: false })));
    }, [selectedLanguage]);

    const handleChangeModel = (what, fieldValue) => {
      const newValue = { ...value, [what]: fieldValue };
      onChange(newValue);
    };

    const handleChange = (what, fieldValue) => {
        const newValue = { ...value, [what]: fieldValue };
        setSelectedLanguage(fieldValue);
        let toLanguages = allPossibleLanguages.filter(lang => lang !== fieldValue);
        setCheckBoxes(toLanguages);
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

    const selectItem = (lang) => {
        const newValue = { ...value};
        const newOptions = [...options];
        const item = newOptions.find(option => option.lang === lang);
        if(item){
            item.isChecked = !item.isChecked;
        }
        setOptions(newOptions);
        let toarray = newOptions.filter(option => option.isChecked).map(option => option.lang);
        let arr = Array.from(toarray);
        onChangeToLanguages(newValue, arr);
    };

    const markChecked = (lang) => {
        return options?.find(option => option?.lang === lang)?.isChecked;
    }

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
                    <DropDown aria-labelledby={languageModelHeaderId} aria-required value={value.translationModel} onChange={(e) => handleChangeModel('translationModel', e.target.value)} options={language_models.map(asLanguageModelOption)} message={validationMessages('translationModel')} disabled={disabled} />
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
            <Row>
                <Col>
                    <FormElementHeader id={languageHeaderId}>{t('record_automatic_subtitle_language_checkboxes')}</FormElementHeader>
                </Col>
            </Row>
            <Row>
                {checkBoxes.slice(0, 2).map((lang) => (
                    <Col
                        key={lang}
                        className="record-translation-subtitle-file-col"
                    >
                        <CheckBox
                            onChange={() => selectItem(lang)}
                            checked={markChecked(lang)}
                            disabled={disabled}
                            label={t(lang)}
                        />
                    </Col>
                ))}
                <Message type={"warning"}>
                    {message?.content['translationLanguageSelected']}
                </Message>
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
