import React, {useState} from 'react';
import './HeaderMenu.css';
import {ReactComponent as Remove} from '../utilities/icons/remove.svg';
import {ReactComponent as Hamburger} from "../utilities/icons/hamburger.svg";
import {useTranslation} from 'react-i18next';
import {belowBreakpoint, leftSideIsHidden, toggleLeftSide} from '../utilities/visibilities';
import { MENU_ICON_ID } from '../../Constants';

const HeaderMenu = () => {
    const { t } = useTranslation();

    const onClick = (e) => {
        e.preventDefault();
        toggleLeftSide();
    };

    return (
      <div id={MENU_ICON_ID} className={`header-menu ${!belowBreakpoint() ? 'hidden' : ''}`}>
        <button onClick={onClick}>
          <div 
            id={`${MENU_ICON_ID}-open`}
            className="hidden"
          >
            <Hamburger 
              title={t('header_menu_show_menu_title')} 
              width="35" 
              height="35" 
              aria-label={t('header_menu_label')} />
          </div>
          <div 
            id={`${MENU_ICON_ID}-close`}
            className="hidden"
          >
            <Remove 
              title={t('header_menu_hide_menu_title')} 
              width="35" 
              height="35" 
              aria-label={t('header_menu_label')} 
            />
          </div>
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
