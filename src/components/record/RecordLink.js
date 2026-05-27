import React from 'react';
import { useTranslation } from 'react-i18next';
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import Colors from "../utilities/HyColors";
import PropTypes from "prop-types";
import ExternalLink from '../utilities/ExternalLink';
import ElementHeader from '../form/ElementHeader';

const RecordLink = ({ to, label, showNotice }) => {
    const { t } = useTranslation();

    if (showNotice) {
      return (
        <>
            <ElementHeader>
                {t('record_link_private_header')}
            </ElementHeader>
            <span className="blockquote">{t('record_link_private_notice')}</span>
        </>
      );
    }

    return (
      <ClipBoardFormElement label={t('record_link_header')} content={to} buttonAriaLabel={t('record_link_copy_aria')}>
          <div className="blockquote">
            <ExternalLink to={to} label={label} fill={Colors.black} height={16} width={16} />
          </div>
      </ClipBoardFormElement>
    );
};

RecordLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default RecordLink;
