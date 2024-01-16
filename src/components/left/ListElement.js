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
  children: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default ListElement;
