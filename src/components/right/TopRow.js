import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './TopRow.css';

const TopRow = ({ 
  breadcrumb,
  children = [] 
}) => {
  const id = useId();
  return (
    <div className="top-row">
      <div className="top-row-left">
        <div className="top-row-breadcrumb">
          {breadcrumb}
        </div>
      </div>
      <div className="top-row-right">
        {children.map((child, i) => {
          return (
            <div key={`${id}-${i}`}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
};

TopRow.propTypes = {
  breadcrumb: PropTypes.node,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default TopRow;
