import React, {useState} from 'react';
import './HeaderMenu.css';
import {ReactComponent as Remove} from '../utilities/icons/remove.svg';
import {ReactComponent as Hamburger} from "../utilities/icons/hamburger.svg";
import {useTranslation} from 'react-i18next';
import { hideLeft, leftExists, leftSideIsHidden, showCloseIcon, showHamburgerIcon, showLeft } from '../utilities/visibilities';
import { MENU_ICON_ID } from '../../Constants';
import useBreakpoint from '../../hooks/useBreakpoint';

const HeaderMenu = () => {
    const { t } = useTranslation();
    const breakpoint = useBreakpoint('xl');
    const belowBreakpoint = breakpoint?.matches;

    const onClick = (e) => {
        e.preventDefault();
        if (leftSideIsHidden()) {
          showLeft();
          showCloseIcon();
        } else {
          hideLeft();
          showHamburgerIcon();
        }
    };

    if (!belowBreakpoint) {
      return <></>;
    }

    return (
      <div id={MENU_ICON_ID} className={`header-menu`}>
        <button onClick={onClick}>
          <div 
            id={`${MENU_ICON_ID}-open`}
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
