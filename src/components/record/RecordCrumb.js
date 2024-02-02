import React from 'react';
import PropTypes from 'prop-types';
import './RecordCrumb.css';
import Crumb from '../form/Crumb';
import useSearchParams from '../../hooks/useSearchParams';

const RecordCrumb = ({ record }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const openRecord = () => {
    setSearchParams({
      record: record.identifier
    });
  };

  const isActive = searchParams.record === record.identifier;

  return (
    <Crumb onClick={openRecord} active={isActive}>
      {record.title}
    </Crumb>
  );
};

RecordCrumb.propTypes = {
  record: PropTypes.object.isRequired
};

export default RecordCrumb;
