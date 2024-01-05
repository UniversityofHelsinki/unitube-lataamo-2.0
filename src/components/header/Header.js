import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Languages from './Languages';
import Logo from './Logo';
import User from './User';

const Header = () => {
  return (
    <Container>
      <Row className="justify-content-between">
        <Col>
          <Logo />
        </Col>
        <Col className="text-end">
          <Container>
            <Row>
              <Col>
                <User />
              </Col>
            </Row>
            <Row>
              <Col>
                <Languages />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

Header.propTypes = {
};

export default Header;
