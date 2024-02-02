import React from 'react';
import Breadcrumb from './Breadcrumb';
import './Breadcrumb.css';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import Crumb from './Crumb';
import RecordCrumb from '../record/RecordCrumb';
import CollectionCrumb from '../collection/CollectionCrumb';

const RecordsBreadCrumb = ({ record }) => {
  const { t } = useTranslation();

  const crumbs = [];
  if (record.series.title.startsWith("inbox")) {
    crumbs.push(<Crumb>{t('breadcrumb_records')}</Crumb>);
    crumbs.push(<RecordCrumb record={record} />);
  } else {
    crumbs.push(<Crumb>{t('breadcrumb_collections')}</Crumb>);
    crumbs.push(<CollectionCrumb collection={record.series} />);
    crumbs.push(<Crumb>{t('breadcrumb_records')}</Crumb>);
    crumbs.push(<RecordCrumb record={record} />);
  }

  return (
      <Breadcrumb crumbs={crumbs} />
  );
};

RecordsBreadCrumb.propTypes = {
  record: PropTypes.object,
};

export default RecordsBreadCrumb;
