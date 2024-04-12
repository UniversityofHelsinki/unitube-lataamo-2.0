import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Right.css';
import useSearchParams from '../../hooks/useSearchParams';
import Record from '../record/Record';
import CollectionForm from '../collection/CollectionForm';
import Statistic from "../statistic/Statistic";

const Right = () => {
  const [searchParams] = useSearchParams();

  let content = <></>;
  if (searchParams.record) {
    content = <Record />;
  } else if (searchParams.collection) {
    content = <CollectionForm />;
  } else if (searchParams.room) {
    content = <Statistic/>;
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
