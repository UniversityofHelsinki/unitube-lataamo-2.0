import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './HeaderMenu.css';
import { ReactComponent as Hamburger } from '../utilities/icons/hamburger.svg';
import { useTranslation } from 'react-i18next';
import { leftSideIsHidden, toggleLeftSide } from '../utilities/visibilities';


const HeaderMenu = () => {
  const { t } = useTranslation();

  const onClick = () => {
    toggleLeftSide();
  };

  return (
      <div className="header-menu">
        <button onClick={onClick}>
          <Hamburger width="32" height="32" aria-label={t('header_menu_label')}/>
        </button>
        <span aria-live="polite" className="screenreader-only">
            {leftSideIsHidden() ? t('header_menu_hidden') : t('header_menu_visible')}
        </span>
      </div>
  );
};

HeaderMenu.propTypes = {

};

export default HeaderMenu;
