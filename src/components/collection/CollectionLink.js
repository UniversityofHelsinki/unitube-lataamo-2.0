import React from 'react';
import PropTypes from 'prop-types';
import './CollectionLink.css'
import ClipBoardFormElement from '../form/ClipBoardFormElement';
import { useTranslation } from 'react-i18next';
import ExternalLink from '../utilities/ExternalLink';
import Colors from "../utilities/HyColors";

const CollectionLink = ({ identifier }) => {
  const { t } = useTranslation();

  const prefix = process.env.REACT_APP_KATSOMO_COLLECTION_LINK;
  const link = `${prefix}${identifier}`;

  return (
    <div className="collection-link">
      <ClipBoardFormElement 
        label={t('collection_form_link')} 
        content={link} 
        buttonAriaLabel={t('collection_form_copy_link')}>
          <ExternalLink to={link} label={link} fill={Colors.black} height={16} width={16} />
        </ClipBoardFormElement>
    </div>
  );

};

CollectionLink.propTypes = {
  identifier: PropTypes.string,
};

export default CollectionLink;