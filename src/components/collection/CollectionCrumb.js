import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCrumb.css';
import Crumb from '../form/Crumb';
import useSearchParams from '../../hooks/useSearchParams';

const CollectionCrumb = ({ collection }) => {
  const [_, setSearchParams] = useSearchParams();
  
  const openCollection = () => {
    setSearchParams({
      collection: collection.identifier
    });
  };

  return (
    <Crumb onClick={openCollection}>
      {collection.title}
    </Crumb>
  );
};

CollectionCrumb.propTypes = {
  collection: PropTypes.object.isRequired
};

export default CollectionCrumb;
