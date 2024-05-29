import React from 'react';
import PropTypes from 'prop-types';
import './LeftList.css';

const LeftList = React.forwardRef(({ children = [] }, ref) => {
  return (
    <div className="left-list-container">
      <div className="left-list">
          <ul ref={ref} className="no-padding left-list-list-container">
            {children.length > 0 && children.map(([element, identifier], i) =>
              <li key={`${identifier}-${i}`} className="left-list-list-element">
                {element}
              </li>
            )}
          </ul>
      </div>
    </div>
  );
});

LeftList.propTypes = {
};

export default LeftList;
