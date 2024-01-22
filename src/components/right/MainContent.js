import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Record from '../record/Record';
import './MainContent.css';
import useSearchParams from '../../hooks/useSearchParams';
import CollectionForm from '../collection/CollectionForm';

const MainContent = () => {
  const [searchParams] = useSearchParams();

  let content = <></>;
  if (searchParams.record) {
    content = <Record />;
  } else if (searchParams.collection) {
    content = <CollectionForm />;
  }

  return (
      <Container>
        <Row>
          <Col className="ps-0">
            {content}
          </Col>
        </Row>
      </Container>
  );
};

MainContent.propTypes = {
};

export default MainContent;
