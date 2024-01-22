import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import './RecordEmbedCode.css';

const RecordEmbedCode = ({ identifier }) => {
    const { t } = useTranslation();

    const content = `<iframe src="https://unitube.it.helsinki.fi/unitube/embed.html?id=${identifier}" scrolling="no" allowfullscreen="true" frameBorder="0" marginHeight="0px" marginWidth="0px" height="360" width="640"></iframe>`;
      

    return (
      <ClipBoardFormElement label={t('record_embed_code_header')} content={content}>
        <pre className="record-embed-code-block">{content}{content}{content}</pre>
      </ClipBoardFormElement>
    );
};

RecordEmbedCode.propTypes = {
  identifier: PropTypes.string.isRequired
};

export default RecordEmbedCode;
