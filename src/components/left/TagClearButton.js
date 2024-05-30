import React from 'react';
import PropTypes from 'prop-types';
import './TagClearButton.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ClearTagSelectionButton } from '../utilities/icons/remove.svg';

const TagClearButton = ({ onClick, disabled }) => {
    const { t } = useTranslation();

    return (
        <button onClick={onClick} disabled={disabled} aria-label={t('tag_clear_button_aria')} className="tag-clear-button">
            <ClearTagSelectionButton />
            <span>{t('tag_clear_button')}</span>
        </button>
    );
};

TagClearButton.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

export default TagClearButton;
