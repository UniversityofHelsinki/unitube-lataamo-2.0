import React from 'react';
import PropTypes from 'prop-types';
import './CollectionIdentifier.css';
import { useTranslation } from 'react-i18next';
import ClipBoardFormElement from '../form/ClipBoardFormElement';

const CollectionIdentifier = ({ identifier }) => {
  const { t } = useTranslation();

  return (
    <div className="collection-identifier">
      <ClipBoardFormElement 
        label={t('collection_form_identifier')} 
        content={identifier} 
        buttonAriaLabel={t('collection_form_copy_identifier')}>
        <span>{identifier}</span>
      </ClipBoardFormElement>
    </div>
  );

};

CollectionIdentifier.propTypes = {
  identifier: PropTypes.string
};

export default CollectionIdentifier;
