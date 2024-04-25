import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './HeaderMenu.css';
import { ReactComponent as Hamburger } from '../utilities/icons/hamburger.svg';
import { useTranslation } from 'react-i18next';
import useVisibilities from '../../hooks/useVisibilities';


const HeaderMenu = () => {
  const { t } = useTranslation();
  const [_leftHidden, _rightHidden, _swap, toggleLeft] = useVisibilities();
  const [isHidden, setIsHidden] = useState(false);

  const onClick = () => {
    toggleLeft();
    setIsHidden(prevState => !prevState);
  };

  return (
      <div className="header-menu">
        <button onClick={onClick}>
          <Hamburger width="32" height="32" aria-label={t('header_menu_label')}/>
        </button>
        <span aria-live="polite" className="toggle-message-sr-only">
            {isHidden ? t('header_menu_hidden') : t('header_menu_visible')}
        </span>
      </div>
  );
};

HeaderMenu.propTypes = {

};

export default HeaderMenu;
