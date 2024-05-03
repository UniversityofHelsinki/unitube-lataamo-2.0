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
import { KNOWN_LOCATIONS, LEFT_CONTAINER_ID, RIGHT_CONTAINER_ID } from './Constants';
import { belowBreakpoint } from './components/utilities/visibilities';

const Lataamo = () => {
  useHistory();
  const [user, loadUser] = useUser();
  const [userLoadingInitiated, setUserLoadingInitiated] = useState(false);
  const [leftHiddenClass, setLeftHiddenClass] = useState('');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!user && !userLoadingInitiated) {
      loadUser();
    }

    if (belowBreakpoint()) {
      setLeftHiddenClass('hidden');
    }

    return () => setUserLoadingInitiated(true);
  }, []);

  if (!location || location === "/" || !KNOWN_LOCATIONS.includes(location)) {
    setLocation("/records");
  }

  return (
      <Loading loading={!Boolean(user)}>
        <Container className="root mx-0">
            <Row className="header-row mb-2">
              <Col as="header" role="banner" className="px-0">
                <Header />
              </Col>
            </Row>
            <Row className="root-main-row">
              <Col id={LEFT_CONTAINER_ID} as="aside" role="complementary" xl={4} className={leftHiddenClass}>
                <Left />
              </Col>
              <Col id={RIGHT_CONTAINER_ID} as="main" role="main" xl={8}>
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
