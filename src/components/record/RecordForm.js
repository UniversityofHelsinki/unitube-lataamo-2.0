import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordName from "./RecordName";
import { Form } from 'react-bootstrap';
import RecordDescription from './RecordDescription';
import './RecordForm.css';

const RecordForm = ({ record }) => {

  const [modifiedRecord, setModifiedRecord] = useState({ ...record });

  const onChange = (what, value) => {
    setModifiedRecord({ ...modifiedRecord, [what]: value});
  };

  return (
    <Container>
      <Form>
          <Row>
            <Col>
                <RecordName 
                  name={modifiedRecord.title}
                  onChange={
                    (event) => onChange('title', event.target.value)
                  }
                />
            </Col>
          </Row>
          <Row>
            <Col>
                <RecordDescription 
                  description={modifiedRecord.description} 
                  onChange={
                    (event) => onChange('description', event.target.value)
                  }
                />
            </Col>
          </Row>
          <Row>
            <Col>
                Voimassaolo
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
      </Form>
    </Container>
  );
};

RecordForm.propTypes = {
  record: PropTypes.object,
};

export default RecordForm;
