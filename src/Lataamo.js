import React, { useRef } from 'react';
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
import { KNOWN_LOCATIONS, LANGUAGES, LEFT_CONTAINER_ID, RIGHT_CONTAINER_ID } from './Constants';
import { hideRight, showCloseIcon, showHamburgerIcon, showRight } from './components/utilities/visibilities';
import useLocalStorage from './hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';
import useBreakpoint from './hooks/useBreakpoint';

const Lataamo = () => {
  useHistory();
  const [user, loadUser] = useUser();
  const [userLoadingInitiated, setUserLoadingInitiated] = useState(false);
  const [localStorageGet] = useLocalStorage();
  const { i18n } = useTranslation();
  const [location, setLocation] = useLocation();
  const breakpoint = useBreakpoint('xl');
  const belowBreakpoint = breakpoint?.matches;

  useEffect(() => {
    if (!user && !userLoadingInitiated) {
      loadUser();
    }

    return () => setUserLoadingInitiated(true);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorageGet('language');
    if (user && user.preferredLanguage && LANGUAGES.includes(user.preferredLanguage) && !savedLanguage) {
      i18n.changeLanguage(user.preferredLanguage);
    }
  }, [user]);

  if (!location || location === "/" || !KNOWN_LOCATIONS.includes(location)) {
    setLocation("/records");
  }

  const hideAfterSlide = (event) => {
    if (event.propertyName === 'width' && belowBreakpoint) {
      const leftWillBeHidden = event.target.classList.contains('hide-after-slide');
      if (leftWillBeHidden) {
        event.target.classList.add('hidden');
        showHamburgerIcon();
        showRight();
      } else {
        showCloseIcon();
        hideRight();
      } 
    }
  };

  return (
      <Loading loading={!Boolean(user)}>
        <Container className="root mx-0">
            <Row className="header-row mb-2">
              <Col as="header" role="banner" className="px-0">
                <Header />
              </Col>
            </Row>
            <Row className="root-main-row">
              <Col 
                id={LEFT_CONTAINER_ID} 
                className={belowBreakpoint ? 'hidden width-transition hide-after-slide' : ''}
                as="aside" 
                role="complementary" 
                xl={4} 
                onTransitionEnd={hideAfterSlide}>
                <Left />
              </Col>
              <Col 
                id={RIGHT_CONTAINER_ID} 
                as="main" 
                role="main" 
                xl={8}>
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
