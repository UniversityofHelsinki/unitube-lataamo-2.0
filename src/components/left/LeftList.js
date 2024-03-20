import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListActions from './ListActions';
import './LeftList.css';

const LeftList = ({ children = [] }) => {
  return (
    <Container className="left-list-container">
      <Row className="mb-2 left-list-actions-container">
        <Col>
          <ListActions />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="no-padding left-list-list-container">
            {children.map(([element, identifier], i) => 
              <li key={`${identifier}-${i}`} className="left-list-list-element">
                {element}
              </li>
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

LeftList.propTypes = {
};

export default LeftList;
