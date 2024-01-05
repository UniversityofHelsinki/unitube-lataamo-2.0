import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonRow from './ButtonRow';
import LeftList from './LeftList';
import Navigation from './Navigation';
import Search from './search/Search';

const Left = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                <Navigation />
              </Col>
            </Row>
            <Row>
              <Col>
                <ButtonRow />
              </Col>
            </Row>
            <Row>
              <Col>
                <Search />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <LeftList />
        </Col>
      </Row>
    </Container>
  );
};

Left.propTypes = {
};

export default Left;
