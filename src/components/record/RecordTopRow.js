import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RecordTopRow.css';
import useRecordTags from '../../hooks/record/useRecordTags';
import CardTags from '../utilities/CardTags';
import RecordActions from './card/RecordActions';
import { useEffect } from 'react';
import Loading from '../utilities/Loading';
import ListReloadButton from '../left/ListReloadButton';
import TopRow from '../right/TopRow';
import RecordsBreadCrumb from '../form/RecordsBreadCrumb';

const getCollection = async (identifier) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const RecordTopRow = ({ record, disabled, reload }) => {
  const [collection, setCollection] = useState({});
  const [tags] = useRecordTags([{ ...record, series: collection.title }]);

  useEffect(() => {
    (async () => {
      const c = await getCollection(record.isPartOf);
      setCollection(c);
    })();
  }, []);

  const breadcrumb = (
    <RecordsBreadCrumb record={record} />
  );

  return (
        <TopRow breadcrumb={breadcrumb}>
            <CardTags tags={[...tags]}/>
            <ListReloadButton onClick={(e) => {
              e.preventDefault();
              reload()
            }}/>
            <Loading loading={!collection.title} logo={false}>
              <RecordActions record={{...record, series: collection.title}} disabled={disabled}/>
            </Loading>
        </TopRow>
  );
};

RecordTopRow.propTypes = {};

export default RecordTopRow;
