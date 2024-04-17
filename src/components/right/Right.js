import React from 'react';
import './Right.css';
import useSearchParams from '../../hooks/useSearchParams';
import Record from '../record/Record';
import CollectionForm from '../collection/CollectionForm';

const Right = () => {
  const [searchParams] = useSearchParams();

  let content = <></>;
  if (searchParams.record) {
    content = <Record />;
  } else if (searchParams.collection) {
    content = <CollectionForm />;
  }

  return (
    content
  );
};

Right.propTypes = {
};

export default Right;
