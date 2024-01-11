import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useRecord from '../../hooks/useRecord';
import RecordForm from './RecordForm';
import RecordStaticInformation from './RecordStaticInformation';

const Record = () => {
  const record = useRecord(123123);
  console.log(record);
  return (
    <Container>
      <Row>
        breadcrumb
      </Row>
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
