import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RecordTopRow.css';
import useRecordTags from '../../hooks/record/useRecordTags';
import CardTags from '../utilities/CardTags';
import RecordActions from './card/RecordActions';
import { useEffect } from 'react';
import Loading from '../utilities/Loading';

const getCollection = async (identifier) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const RecordTopRow = ({ record }) => {
  const [collection, setCollection] = useState({});
  const tags = useRecordTags({ ...record, series: collection.title });

  useEffect(() => {
    (async () => {
      const c = await getCollection(record.isPartOf);
      setCollection(c);
    })();
  }, []);

  return (
    <Loading loading={!collection.title} logo={false}>
      <div className="record-top-row">
        <CardTags tags={[ ...tags ]} />
        <RecordActions record={{ ...record, series: collection.title }} />
      </div>
    </Loading>
  );
};

RecordTopRow.propTypes = {
};

export default RecordTopRow;
