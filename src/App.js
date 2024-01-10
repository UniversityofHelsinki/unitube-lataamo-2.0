import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Left from './components/left/Left';
import Right from './components/right/Right';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import lataamoReducer from './redux/reducers';

const store = createStore(lataamoReducer, applyMiddleware(thunk));

i18n
  .use(initReactI18next)
  .init({
    resources: translations,
    lng: 'fi',
    fallbackLng: 'cimode',
    supportedLngs: ['fi', 'en', 'sv']
  });

const App = () => {
  return (
    <Provider store={store}>
      <Container className="root mx-0">
        <Row>
          <Col className="px-0">
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
          <Col className="px-0">
            <Footer />
          </Col>
        </Row>
      </Container>
    </Provider>
  );
};

App.propTypes = {
};

export default App;
