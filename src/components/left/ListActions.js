import React from 'react';
import './ListActions.css';
import ListSortMenu from './ListSortMenu';
import ListReloadButton from './ListReloadButton';

const ListActions = ({ 
  currentSortCriteria, 
  sortCriterias, 
  onSortOptionChange,
  descending,
  reload
}) => {
  const sortSupported = currentSortCriteria && sortCriterias && onSortOptionChange;
  return (
    <div className="list-actions">
          {reload && <ListReloadButton onClick={reload} />}
          { sortSupported && <ListSortMenu 
            currentCriteria={currentSortCriteria} 
            criterias={sortCriterias} 
            onSelect={onSortOptionChange}
            descending={descending}
          />}
    </div>
  );
};

ListActions.propTypes = {
};

export default ListActions;
