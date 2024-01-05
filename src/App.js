import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Left from './components/left/Left';
import Right from './components/right/Right';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Left />
        </Col>
        <Col sm={8}>
          <Right />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  );
}

App.propTypes = {
};

export default App;
