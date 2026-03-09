import React from 'react';
import PropTypes from 'prop-types';
import './CollectionLink.css'
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import { useTranslation } from 'react-i18next';

const CollectionLink = ({ identifier }) => {
  const { t } = useTranslation();

  const link = `https://www.helsinki.fi/fi/ajankohtaista/unitube?search=${identifier}`;

  return (
    <div className="collection-link">
      <ClipBoardFormElement 
        label={t('collection_form_link')} 
        content={link} 
        buttonAriaLabel={t('collection_form_copy_link')}>
          <a href={link}>{link}</a>
        </ClipBoardFormElement>
    </div>
  );

};

CollectionLink.propTypes = {
  identifier: PropTypes.string,
};

export default CollectionLink;