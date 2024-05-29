import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './TopRow.css';
import HeaderMenu from "../header/HeaderMenu";

const TopRow = ({ children = [] }) => {
  const id = useId();
  return (
    <div className="top-row">
      {children.map((child, i) => {
        return (
          <div key={`${id}-${i}`}>
            {child}
          </div>
        );
      })}
      <div className="header-menu-icon">
        <HeaderMenu/>
      </div>
    </div>
  );
};

TopRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node)
};

export default TopRow;
