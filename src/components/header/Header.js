import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Languages from './Languages';
import Logo from './Logo';
import User from './User';
import ExternalLink from '../utilities/ExternalLink';
import { useTranslation } from 'react-i18next';
import Colors from '../utilities/HyColors.js';
import './Header.css';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const { t } = useTranslation();
  return (
    <div className="header">
      <div className="header-left">
        <div className="header-menu-icon">
          <HeaderMenu />
        </div>
        <div className="header-logo">
          <Logo />
        </div>
      </div>
      <div className="header-right">
        <Languages />
        <User />
      </div>
    </div>
  );
};

Header.propTypes = {
};

export default Header;
