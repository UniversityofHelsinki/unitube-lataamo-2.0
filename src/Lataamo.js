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
import { useEffect } from 'react';
import { useState } from 'react';
import useVisibilities from './hooks/useVisibilities';
import { KNOWN_LOCATIONS } from './Constants';

const Lataamo = () => {
  useHistory();
  const [user, loadUser] = useUser();
  const [userLoadingInitiated, setUserLoadingInitiated] = useState(false);
  const [location, setLocation] = useLocation();
  const [leftHidden, rightHidden] = useVisibilities();

  useEffect(() => {
    if (!user && !userLoadingInitiated) {
      loadUser();
    }
    return () => setUserLoadingInitiated(true);
  }, []);

  if (!location || location === "/" || !KNOWN_LOCATIONS.includes(location)) {
    setLocation("/records");
  }

  const leftHiddenClass = leftHidden ? 'hidden' : '';
  const rightHiddenClass = rightHidden ? 'hidden' : '';

  return (
      <Loading loading={!Boolean(user)}>
        <Container className="root mx-0">
            <Row className="header-row mb-2">
              <Col as="header" role="banner" className="px-0">
                <Header />
              </Col>
            </Row>
            <Row className="root-main-row">
              <Col as="aside" role="complementary" xl={rightHidden ? 12 : 4} className={`${leftHiddenClass}`}>
                <Left />
              </Col>
              <Col as="main" role="main" xl={leftHidden ? 12 : 8} className={`${rightHiddenClass}`}>
                <Right />
              </Col>
            </Row>
            <Row>
              <Col as="footer" role="contentinfo" className="px-0">
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
