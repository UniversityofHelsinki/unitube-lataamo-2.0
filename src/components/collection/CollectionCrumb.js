import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCrumb.css';
import Crumb from '../form/Crumb';
import useSearchParams from '../../hooks/useSearchParams';

const CollectionCrumb = ({ collection }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = searchParams.collection === collection.identifier;

  const openCollection = () => {
    setSearchParams({
      collection: collection.identifier
    });
  };

  return (
    <Crumb href={`?collection=${collection.identifier}`} active={isActive} onClick={openCollection}>
      {collection.title}
    </Crumb>
  );
};

CollectionCrumb.propTypes = {
  collection: PropTypes.object.isRequired
};

export default CollectionCrumb;
