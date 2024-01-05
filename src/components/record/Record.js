import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import useRecord from '../../hooks/useRecord';
import RecordForm from './RecordForm';
import RecordStaticInformation from './RecordStaticInformation';

const Record = () => {
  const record = useRecord(123123);
  console.log(record);
  return (
    <Container>
      <Row>
        <Col lg>
          <RecordStaticInformation />
        </Col>
        <Col lg>
          <RecordForm />
        </Col>
      </Row>
    </Container>
  );
};

Record.propTypes = {
};

export default Record;
