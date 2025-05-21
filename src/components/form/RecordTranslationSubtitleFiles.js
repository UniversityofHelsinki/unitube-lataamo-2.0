import React, {useEffect, useId, useState} from 'react';
import PropTypes from 'prop-types';
import './RecordAutomaticSubtitleFile.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import CheckBox from "./CheckBox";
import Message from "./Message";

const RecordTranslationSubtitles = ({ vttFiles, onChange, message, disabled = false }) => {
    const { t } = useTranslation();
    const languageHeaderId = useId();
    const allPossibleLanguages = ['fin', 'swe', 'eng'];
    let vttLanguages = Object.values(vttFiles).map(item => item.lang);
    const [selectedLanguage, setSelectedLanguage] = useState(vttLanguages[0]);
    let [checkBoxes, setCheckBoxes] = useState(allPossibleLanguages.filter(lang => lang !== selectedLanguage));
    const [options, setOptions] = useState([
        {lang: 'fin', isChecked: false},
        {lang: 'swe', isChecked: false},
        {lang: 'eng', isChecked: false},
    ]);

    useEffect(() => {
        setOptions(options.map(option => ({ ...option, isChecked: false })));
        onChange(selectedLanguage, options);
    }, [selectedLanguage]);

    const handleChange = (what, fieldValue) => {
        setSelectedLanguage(fieldValue);
        let toLanguages = allPossibleLanguages.filter(lang => lang !== fieldValue)
        setCheckBoxes(toLanguages);
    };

    const asLanguageOption = (language) => {
        if (language) {
            return { value: language, label: t(language) };
        }
        return { value: '', label: t('record_automatic_subtitle_default_language') };
    };

    const selectItem = (lang) => {
        const newOptions = [...options];
        const item = newOptions.find(option => option.lang === lang);
        if(item){
            item.isChecked = !item.isChecked;
        }
        setOptions(newOptions);
        let toarray = {
            to: newOptions
        };
        onChange(selectedLanguage, toarray);
    };

    const markChecked = (lang) => {
        return options?.find(option => option?.lang === lang)?.isChecked;
    }

    const findUrlByLang = (lang) => {
        // Split the lang by underscore and get the last part
        const langPart = lang?.split('_').pop();
        // Find the file with matching language
        for (let key in vttFiles) {
            if (vttFiles[key].lang === langPart) {
                return vttFiles[key].url;
            }
        }
        return null;
    };

    return (
        <Container className="px-0 py-1 mb-3">
            <Row className="mb-3">
                <Col>
                    <FormElementHeader id={languageHeaderId}>{t('record_translation_subtitle_language')}</FormElementHeader>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropDown aria-labelledby={languageHeaderId} aria-required value={selectedLanguage}
                              onChange={(e) => handleChange('translationLanguage', e.target.value)}
                              options={vttLanguages.map(asLanguageOption)}
                              disabled={disabled}/>
                    <p className="mt-0">{t('record_translation_for_subtitle_file')}: {findUrlByLang(selectedLanguage)}</p>
                </Col>
            </Row>
            <Row>
            </Row>
            <Row>
                <Col>
                    <FormElementHeader id={languageHeaderId}>{t('record_translation_for_subtitle_languages')}</FormElementHeader>
                </Col>
            </Row>
                <Row>
                    {checkBoxes.slice(0, 2).map((lang) => (
                        <Col key={lang} className="record-translation-subtitle-file-col">
                            <CheckBox
                                onChange={() => selectItem(lang)}
                                checked={markChecked(lang)}
                                disabled={disabled}
                                label={t(lang)}
                            />
                        </Col>
                    ))}
                    <Message type={"warning"}>
                        {message?.content['translationLanguage']}
                    </Message>
                </Row>
        </Container>
    );
};

RecordTranslationSubtitles.propTypes = {
    vttFiles: PropTypes.objectOf(PropTypes.shape({
        lang: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })).isRequired,
    message: PropTypes.shape({
        content: PropTypes.shape({
            translationLanguage: PropTypes.string
        }),
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default RecordTranslationSubtitles;
