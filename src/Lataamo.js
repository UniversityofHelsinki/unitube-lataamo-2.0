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
import useLocation from './hooks/useLocation';
import useHistory from './hooks/useHistory';

const Lataamo = () => {
  useHistory();
  const [user] = useUser();
  const [location, setLocation] = useLocation();

  if (!location || location === "/") {
    setLocation("/records");
  }

  return (
      <Loading loading={!Boolean(user)}>
        <Container className="root mx-0">
            <Row>
              <Col className="px-0">
                <Header />
              </Col>
            </Row>
            <Row className="root-main-row">
              <Col md={4} className="root-main-row-left-col">
                <Left />
              </Col>
              <Col md={8} className="root-main-row-right-col">
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
