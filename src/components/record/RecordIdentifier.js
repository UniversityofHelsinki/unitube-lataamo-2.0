import React from 'react';
import { useTranslation } from 'react-i18next';
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import PropTypes from "prop-types";

const RecordIdentifier = ({ id }) => {
    const { t } = useTranslation();

    return (
          <ClipBoardFormElement 
            label={t('record_identifier_header')}
            content={id}>
            <span className="blockquote">45ce69e0-1793-4494-8674-fff6d48f4a2f</span>
          </ClipBoardFormElement>
    );
};

RecordIdentifier.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecordIdentifier;
