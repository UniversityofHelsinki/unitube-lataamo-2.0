import React from 'react';
import PropTypes from 'prop-types';

const ListElement = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

ListElement.propTypes = {
  children: PropTypes.array.isRequired
};

export default ListElement;
