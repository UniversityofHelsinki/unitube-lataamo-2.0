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

  return (
    <Loading loading={!collection.title} logo={false}>
      <TopRow>
          <ListReloadButton onClick={(e) => { e.preventDefault(); reload() }} />
          <CardTags tags={[ ...tags ]} />
          <RecordActions record={{ ...record, series: collection.title }} disabled={disabled} />
      </TopRow>
    </Loading>
  );
};

RecordTopRow.propTypes = {
};

export default RecordTopRow;
