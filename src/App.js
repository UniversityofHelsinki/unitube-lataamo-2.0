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
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import lataamoReducer from './redux/reducers';

const store = createStore(lataamoReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

App.propTypes = {
};

export default App;
