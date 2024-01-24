import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordName from "./RecordName";
import { Form } from 'react-bootstrap';
import RecordDescription from './RecordDescription';
import './RecordForm.css';
import useRecordValidation from '../../hooks/validation/record/useRecordValidation';
import RecordEndDate from './RecordEndDate';

const RecordForm = ({ record }) => {

  const [modifiedRecord, setModifiedRecord] = useState({ ...record });
  const [isValid, messages, validate] = useRecordValidation([
    'title', 'description'
  ]);

  const onChange = async (what, value) => {
    const newRecord = { ...modifiedRecord, [what]: value };
    setModifiedRecord(newRecord);
    await validate(newRecord);
  };

  return (
    <Container>
      <Form>
          <Row>
            <Col>
                <RecordName 
                  name={modifiedRecord.title}
                  onChange={
                    (title) => onChange('title', title)
                  }
                  message={messages.title}
                />
            </Col>
          </Row>
          <Row>
            <Col>
                <RecordDescription 
                  description={modifiedRecord.description} 
                  onChange={
                    (description) => onChange('description', description)
                  }
                  message={messages.description}
                />
            </Col>
          </Row>
          <Row>
            <Col>
              <RecordEndDate 
                endDate={modifiedRecord.deletionDate}
                onChange={
                  (date) => onChange('deletionDate', (date || new Date()).toISOString())
                }
                message={messages.deletionDate} 
              />
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
