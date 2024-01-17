import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import './RecordEmbedCode.css';

const RecordEmbedCode = ({ content }) => {
    const { t } = useTranslation();

    return (
      <ClipBoardFormElement label={t('record_embed_code_header')} content={content}>
        <pre className="record-embed-code-block">{content}{content}{content}</pre>
      </ClipBoardFormElement>
    );
};

RecordEmbedCode.propTypes = {
};

export default RecordEmbedCode;
