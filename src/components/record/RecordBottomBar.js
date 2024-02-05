import React from 'react';
import PropTypes from 'prop-types';
import './RecordBottomBar.css';
import BottomBar from '../right/BottomBar';

const RecordBottomBar = () => {
  return (
    <BottomBar 
      notifications={<span>moi</span>}
      buttons={<button className="btn">moi</button>} />
  );
};

RecordBottomBar.propTypes = {
};

export default RecordBottomBar;
