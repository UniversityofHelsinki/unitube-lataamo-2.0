import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import './RecordEmbedCode.css';
import { RECORD_EMBED_CODE } from '../../Constants';

const RecordEmbedCode = ({ identifier }) => {
    const { t } = useTranslation();

    const content = RECORD_EMBED_CODE(identifier);

    return (
      <ClipBoardFormElement label={t('record_embed_code_header')} content={content} buttonAriaLabel={t('record_embed_code_copy_aria')}>
        <pre className="record-embed-code-block">{content}</pre>
      </ClipBoardFormElement>
    );
};

RecordEmbedCode.propTypes = {
  identifier: PropTypes.string.isRequired
};

export default RecordEmbedCode;
