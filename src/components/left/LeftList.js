import React from 'react';
import ListActions from './ListActions';
import './LeftList.css';

const LeftList = ({ 
  children = [],
  currentSortCriteria,
  sortCriterias,
  onSortOptionChange,
  descending
}) => {
  return (
    <div className="left-list-container">
      <div className="left-list-actions">
        <ListActions 
          currentSortCriteria={currentSortCriteria}
          sortCriterias={sortCriterias}
          descending={descending}
          onSortOptionChange={onSortOptionChange}
        />
      </div>
      <div className="left-list">
          <ul className="no-padding left-list-list-container">
            {children.length > 0 && children.map(([element, identifier], i) =>
              <li key={`${identifier}-${i}`} className="left-list-list-element">
                {element}
              </li>
            )}
          </ul>
      </div>
    </div>
  );
};

LeftList.propTypes = {
};

export default LeftList;
