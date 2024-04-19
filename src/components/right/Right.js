import React from 'react';
import './Right.css';
import useSearchParams from '../../hooks/useSearchParams';
import Record from '../record/Record';
import CollectionForm from '../collection/CollectionForm';
import Statistic from "../statistic/Statistic";

const Right = () => {
  const [searchParams] = useSearchParams();

  let content = <></>;
  if (searchParams.record) {
    content = <Record />;
  } else if (searchParams.collection) {
    content = <CollectionForm />;
  } else if (searchParams.room) {
    content = <Statistic/>;
  }

  return (
    content
  );
};

Right.propTypes = {
};

export default Right;
