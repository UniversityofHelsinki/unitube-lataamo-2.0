import React from 'react';
import PropTypes from 'prop-types';
import './HeaderMenu.css';
import { ReactComponent as Hamburger } from '../utilities/icons/hamburger.svg';
import { useTranslation } from 'react-i18next';
import useVisibilities from '../../hooks/useVisibilities';


const HeaderMenu = () => {
  const { t } = useTranslation();
  const [_leftHidden, _rightHidden, _swap, toggleLeft] = useVisibilities();

  const onClick = () => {
    toggleLeft();
  };

  return (
    <div className="header-menu">
      <button onClick={onClick}>
        <Hamburger width="32" height="32" aria-label={t('header_menu_label')} />
      </button>
    </div>
  );
};

HeaderMenu.propTypes = {
};

export default HeaderMenu;
