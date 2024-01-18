import React from 'react';
import PropTypes from 'prop-types';
import './Lataamo.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/header/Header';
import Left from './components/left/Left';
import Right from './components/right/Right';
import Footer from './components/footer/Footer';
import useUser from './hooks/useUser';
import Loading from './components/utilities/Loading';

const Lataamo = () => {
  const [user] = useUser();

  return (
      <Loading loading={!Boolean(user)}>
        <Container className="root mx-0">
            <Row>
              <Col className="px-0">
                <Header />
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Left />
              </Col>
              <Col md={8}>
                <Right />
              </Col>
            </Row>
            <Row>
              <Col className="px-0">
                <Footer />
              </Col>
            </Row>
        </Container>
      </Loading>
  );
};

Lataamo.propTypes = {
};

export default Lataamo;
