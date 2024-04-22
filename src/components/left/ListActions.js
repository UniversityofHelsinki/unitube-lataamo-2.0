import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './ListActions.css';
import ListSortMenu from './ListSortMenu';

const ListActions = ({ 
  currentSortCriteria, 
  sortCriterias, 
  onSortOptionChange,
  descending 
}) => {
  const sortSupported = currentSortCriteria && sortCriterias && onSortOptionChange;
  return (
    <Container className="list-actions">
      <Row className="justify-content-end">
        <Col className="list-actions-col px-0">
          { sortSupported && <ListSortMenu 
            currentCriteria={currentSortCriteria} 
            criterias={sortCriterias} 
            onSelect={onSortOptionChange}
            descending={descending}
          />}
        </Col>
      </Row>
    </Container>
  );
};

ListActions.propTypes = {
};

export default ListActions;
