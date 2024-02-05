import React from 'react';
import PropTypes from 'prop-types';
import './CollectionBottomBar.css';
import BottomBar from '../right/BottomBar';

const CollectionBottomBar = () => {
  return (
    <BottomBar 
      notifications={<span>moi</span>}
      buttons={<button className="btn">moi</button>} />
  );
};

CollectionBottomBar.propTypes = {
};

export default CollectionBottomBar;
