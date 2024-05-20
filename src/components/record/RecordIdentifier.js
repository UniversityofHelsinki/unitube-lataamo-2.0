import React from 'react';
import { useTranslation } from 'react-i18next';
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import PropTypes from "prop-types";

const RecordIdentifier = ({ identifier }) => {
    const { t } = useTranslation();

    return (
          <ClipBoardFormElement 
            label={t('record_identifier_header')}
            buttonAriaLabel={t('record_identifier_header_copy_aria')}
            content={identifier}>
            <span className="blockquote">{identifier}</span>
          </ClipBoardFormElement>
    );
};

RecordIdentifier.propTypes = {
  identifier: PropTypes.string.isRequired
};

export default RecordIdentifier;
