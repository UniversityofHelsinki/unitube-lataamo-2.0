import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../utilities/Loading';

const ListContainer = () => {
  return (
    <Loading loading={true}>
      <ul>
        <li>tallenne</li>
        <li>tallenne</li>
        <li>tallenne</li>
        <li>tallenne</li>
        <li>tallenne</li>
        <li>tallenne</li>
      </ul>
    </Loading>
  );
};

ListContainer.propTypes = {
};

export default ListContainer;
