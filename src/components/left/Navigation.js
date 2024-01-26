import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Nav } from 'react-bootstrap';
import './Navigation.css';
import { useTranslation } from 'react-i18next';
import useLocation from '../../hooks/useLocation';

const Navigation = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useLocation();

  const activeProps = (path) => 
    path === location ? { className: "nav-item-active" } : {};

  const onSelect = (path) => {
    setLocation(path);
  };

  const tabs = [{
    path: "/records",
    label: t('navigation_records')
  }, {
    path: "/collections",
    label: t('navigation_collections')
  }];

  return (
    <Container className="navigation">
      <Row className="text-center no-padding">
        <Nav as="nav" justify fill variant="tabs" activeKey={location} className="no-padding" onSelect={onSelect}>
            {tabs.map(({ path, label }) => (
              <Nav.Item key={path} { ...activeProps(path) }>
                <Nav.Link eventKey={path}>
                  {label}
                </Nav.Link>
              </Nav.Item>
            ))}
        </Nav>
      </Row>
    </Container>
  );
};

Navigation.propTypes = {
};

export default Navigation;
