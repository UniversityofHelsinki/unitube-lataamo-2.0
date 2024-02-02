import React from 'react';
import PropTypes from 'prop-types';
import './RecordCrumb.css';
import Crumb from '../form/Crumb';
import useSearchParams from '../../hooks/useSearchParams';

const RecordCrumb = ({ record }) => {
  const [_, setSearchParams] = useSearchParams();
  const openRecord = () => {
    setSearchParams({
      record: record.identifier
    });
  };

  return (
    <Crumb onClick={openRecord}>
      {record.title}
    </Crumb>
  );
};

RecordCrumb.propTypes = {
  record: PropTypes.object.isRequired
};

export default RecordCrumb;
