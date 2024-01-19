import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useRecord from '../../hooks/useRecord';
import RecordForm from './RecordForm';
import RecordStaticInformation from './RecordStaticInformation';
import BreadCrumb from '../form/BreadCrumb';
import './Record.css';
import Loading from '../utilities/Loading';

const Record = () => {
  const [record, loading] = useRecord();

  return (
    <Loading loading={loading}>
      <Container>
        <Row>
          <BreadCrumb />
        </Row>
        <Row>
          <Col lg={5}>
            <RecordStaticInformation record={record} />
          </Col>
          <Col lg>
            <RecordForm record={record} />
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

Record.propTypes = {
};

export default Record;
