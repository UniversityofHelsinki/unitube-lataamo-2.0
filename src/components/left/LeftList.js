import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LeftList.css';
import { useTranslation } from 'react-i18next';

const SelectElement = ({ checked, onSelect }) => {
  const { t } = useTranslation();

  return (
    <input 
      type="checkbox" 
      aria-label={t('left_list_select_element')} 
      checked={checked} 
      onChange={onSelect} 
      title={t('left_list_select_element_title')}
    />
  );

};

const LeftList = React.forwardRef(({ children = [], selected, onSelect, canBeSelected = [] }, ref) => {

  const selectionSupported = selected && onSelect;

  return (
    <div className="left-list-container">
      <div className="left-list">
          <ul ref={ref} className="no-padding left-list-list-container">
            {children.length > 0 && children.map(([element, identifier], i) =>
              <li key={`${identifier}-${i}`} className="left-list-list-element">
                <div className="left-list-main-element">
                  {element}
                  <div className="left-list-select-container">
                    {selectionSupported && canBeSelected.includes(identifier) && <SelectElement checked={selected.has(identifier)} onSelect={() => onSelect(identifier)} />}
                  </div>
                </div>
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
