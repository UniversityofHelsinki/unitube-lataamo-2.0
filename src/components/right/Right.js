import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Right.css';
import { Button } from 'react-bootstrap';
import useSearchParams from '../../hooks/useSearchParams';
import Record from '../record/Record';
import CollectionForm from '../collection/CollectionForm';

const Right = () => {
  const [searchParams] = useSearchParams();

  let content = <></>;
  if (searchParams.record) {
    content = <Record />;
  } else if (searchParams.collection) {
    content = <CollectionForm />;
  }

  return (
    <Container className="right">
      <Row className="right-main-content-row">
        <Col className="right-main-content-col">
          {content}
        </Col>
      </Row>
    </Container>
  );
};

Right.propTypes = {
};

export default Right;
