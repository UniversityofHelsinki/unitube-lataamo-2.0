import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Languages from './Languages';
import Logo from './Logo';
import User from './User';
import HeaderText from "./HeaderText";

const Header = () => {
  return (
    <Container>
      <Row className="justify-content-between">
        <Col className="text-start">
        <Container>
          <Row>
            <Col>
              <Logo />
            </Col>
          </Row>
          <Row>
            <Col>
            <HeaderText />
            </Col>
          </Row>
        </Container>
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
