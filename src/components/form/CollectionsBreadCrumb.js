import React from 'react';
import Breadcrumb from './Breadcrumb';
import PropTypes from "prop-types";
import Crumb from './Crumb';
import CollectionCrumb from '../collection/CollectionCrumb';
import { useTranslation } from 'react-i18next';

const CollectionsBreadCrumb = ({ collection }) => {
  const { t } = useTranslation();

  const crumbs = [
    <Crumb>{t('breadcrumb_collections')}</Crumb>,
    <CollectionCrumb collection={collection} />
  ];

  return (
      <Breadcrumb crumbs={crumbs} />
  );
};

CollectionsBreadCrumb.propTypes = {
  collection: PropTypes.object.isRequired,
};

export default CollectionsBreadCrumb;
