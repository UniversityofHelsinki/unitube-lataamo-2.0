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

const Header = () => {
  const { t } = useTranslation();
  return (
    <Container className="header">
      <Row className="justify-content-between">
        <Col className="text-start">
          <ExternalLink to="https://helsinki.fi" label={t('university_of_helsinki')} fill={Colors.darkGray} />
        </Col>
        <Col className="text-end">
          <Container>
            <Row>
              <Col>
                <User />
              </Col>
            </Row>
            <Row>
              <Languages />
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="header-second-row">
        <Col>
          <Logo />
        </Col>
      </Row>
    </Container>
  );
};

Header.propTypes = {
};

export default Header;
