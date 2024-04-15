import React from 'react';
import PropTypes from 'prop-types';
import './ListSortMenu.css';
import HyMenu from '../utilities/HyMenu';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AscendingIcon } from '../utilities/icons/arrow-up.svg';
import { ReactComponent as DescendingIcon } from '../utilities/icons/arrow-down.svg';

const ListSortMenu = ({ 
  currentCriteria, 
  criterias, 
  descending,
  onSelect,
}) => {
  const { t } = useTranslation();

  const buttonLabel = (
    <div className="list-sort-menu-button-label-container">
      <span className="list-sort-menu-button-label">{t('list_sort_menu_sort_label')}</span>
      <span className="list-sort-menu-button-label-sub-text">{t(`list_sort_menu_criteria_${currentCriteria}`)}</span>
    </div>
  );

  const DirectionIcon = descending ? DescendingIcon : AscendingIcon;

  const handleSelection = (criteria, direction) => {
    onSelect(criteria, direction);
  };

  const changeDirection = () => {
    onSelect(currentCriteria, !descending);
  };

  return (
    <div className="list-sort-menu">
      <HyMenu 
        buttonLabel={buttonLabel}
        selectedItems={[criterias.indexOf(currentCriteria)]}
        onSelect={(index) => handleSelection(criterias[index], descending)}
      >
        {criterias.map(criteria =>
          <span key={criteria}>{t(`list_sort_menu_criteria_${criteria}`)}</span>
        )}
      </HyMenu>
      <div>
        <button className="list-sort-menu-scending-button" onClick={changeDirection} aria-label={t('list_sort_menu_direction_button_label')} title={t(`list_sort_menu_direction_${descending ? 'descending' : 'ascending'}`)}>
          <DirectionIcon />
        </button>
      </div>
    </div>
  );
};

ListSortMenu.propTypes = {
  currentCriteria: PropTypes.string,
  criterias: PropTypes.arrayOf(PropTypes.string),
  descending: PropTypes.bool,
};

export default ListSortMenu;
