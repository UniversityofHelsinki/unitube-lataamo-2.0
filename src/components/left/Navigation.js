import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Nav } from 'react-bootstrap';
import './Navigation.css';

const Navigation = () => {
  const [selectedTab, setSelectedTab] = useState("/records");

  const onSelect = (selectedTab) => setSelectedTab(selectedTab);

  return (
    <Container className="navigation">
      <Row className="text-center no-padding">
        <Nav as="nav" justify fill variant="tabs" activeKey={selectedTab} className="no-padding" onSelect={onSelect}>
            <Nav.Item>
              <Nav.Link eventKey="/records" href="#">Tallenteet</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/collections" href="#">Kokoelmat</Nav.Link>
            </Nav.Item>
        </Nav>
      </Row>
    </Container>
  );
};

Navigation.propTypes = {
};

export default Navigation;
