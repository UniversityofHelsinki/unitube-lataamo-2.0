import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionKeywords.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormElementHeader from '../../form/FormElementHeader';
import InputField from '../../form/InputField';
import HyButton from '../../utilities/HyButton';
import { onEnter } from '../../accessibility/keydown';
import CollectionKeyword from './CollectionKeyword';
import HelpDialog from '../../dialog/HelpDialog';

const CollectionKeywords = ({ keywords = [], onKeywordChange, disabled }) => {
    const [value, setValue] = useState('');
    const { t } = useTranslation();
    const id = useId();

    const clearInputField = () => setValue('');

    const trimmedValue = (value || '').trim();
    const inputFieldContainsValidKeyword = trimmedValue.length > 0;
    const keywordAlreadyExists = keywords.includes(trimmedValue);

    const addKeyword = () => {
        if (!inputFieldContainsValidKeyword || keywordAlreadyExists) {
            return;
        }
        const newKeywords = [ ...keywords, trimmedValue ];
        if (onKeywordChange) {
            onKeywordChange(newKeywords);
            clearInputField();
        }
    };

    const removeKeyword = (keyword) => {
        if (onKeywordChange) {
            onKeywordChange(keywords.filter(k => k !== keyword));
        }
    };

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const onEnterAddKeyword = (event) => {
        if (inputFieldContainsValidKeyword && !keywordAlreadyExists) {
            onEnter(addKeyword)(event);
        }
    };

    return (
        <Container className="collection-keywords">
            <Row>
                <Col>
                    <FormElementHeader id={id} helpDialog={
                      <HelpDialog label={t('collection_keywords_help_label')}>
                        {t('collection_keywords_help_content')}
                      </HelpDialog>
                    }>
                        {t('collection_keywords_form_header')}
                    </FormElementHeader>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <div className="collection-keywords-input">
                        <InputField
                            aria-labelledby={id}
                            type="text"
                            placeholder={t('collection_keywords_placeholder')}
                            value={value}
                            onChange={handleInputChange}
                            disabled={disabled}
                            onKeyDown={onEnterAddKeyword}
                            hideMessage={true}
                        />
                        <HyButton
                            variant="primary"
                            className="collection-keywords-add-button"
                            onClick={addKeyword}
                            disabled={disabled || !inputFieldContainsValidKeyword || keywordAlreadyExists}
                        >
                            {t('collection_keywords_add_button')}
                        </HyButton>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="collection-keywords-list">
                        {keywords.map((keyword, i) =>
                            <li key={`${i}-${keyword}`}>
                                <CollectionKeyword label={keyword} onRemove={() => removeKeyword(keyword)} disabled={disabled} />
                            </li>
                        )}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

CollectionKeywords.propTypes = {
    keywords: PropTypes.array,
    onKeywordChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export default CollectionKeywords;
