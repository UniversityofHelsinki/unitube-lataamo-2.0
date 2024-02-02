import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useRecord from '../../hooks/useRecord';
import RecordForm from './RecordForm';
import RecordStaticInformation from './RecordStaticInformation';
import './Record.css';
import Loading from '../utilities/Loading';
import RecordsBreadCrumb from "../form/RecordsBreadCrumb";
import {useTranslation} from "react-i18next";

const Record = () => {
  const [record, loading] = useRecord();
  const { t } = useTranslation();

 return (
    <Loading loading={loading}>
      <Container className="ps-0">
        <Row>
          <RecordsBreadCrumb record={record} />
        </Row>
        <Row>
          <Col lg={5} className="ps-0">
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
