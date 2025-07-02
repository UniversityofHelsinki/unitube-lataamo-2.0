import React from 'react';
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
    <Container>
      <Row>
        <Col lg={1} className="footer-hy-logo">
          <div aria-hidden="true">
            <HyLogo fill={Colors.white} />
          </div>
        </Col>
        <Col lg={3}>
          <ContactDetails />
        </Col>
        <Col lg={3}>
          <FooterLinks />
        </Col>
      </Row>
    </Container>
  );
};

Footer.propTypes = {
};

export default Footer;
