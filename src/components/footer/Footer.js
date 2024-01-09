import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import HyLogo from "../utilities/HyLogo";
import ContactDetails from './ContactDetails';
import FooterLinks from './FooterLinks';
import Colors from '../utilities/HyColors';

const Footer = () => {
  return (
    <Container as="footer">
      <Row>
        <Col className="text-end">
          <HyLogo fill={Colors.white} />
        </Col>
        <Col>
          <ContactDetails />
        </Col>
        <Col>
          <FooterLinks />
        </Col>
      </Row>
    </Container>
  );
};

Footer.propTypes = {
};

export default Footer;
