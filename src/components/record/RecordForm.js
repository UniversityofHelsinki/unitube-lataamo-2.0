import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordName from "./RecordName";
import RecordDescription from './RecordDescription';
import './RecordForm.css';
import RecordEndDate from './RecordEndDate';
import RecordCollections from "./RecordCollections";
import RecordSubtitle from "./RecordSubtitle";
import RecordLicense from './RecordLicense';

const RecordForm = ({
  record,
  vttFiles,
  validationMessages,
  onChange,
  disabled
}) => {

  return (
    <Container className="ps-0">
          <Row className="mb-2">
            <Col>
                <RecordName
                  name={record.title}
                  onChange={
                    (title) => onChange('title', title)
                  }
                  message={validationMessages?.title}
                  disabled={disabled}
                />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
                <RecordDescription
                  description={record.description}
                  onChange={
                    (description) => onChange('description', description)
                  }
                  message={validationMessages?.description}
                  disabled={disabled}
                />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <RecordEndDate
                endDate={record.deletionDate}
                onChange={
                  (date) => onChange('deletionDate', date)
                }
                message={validationMessages?.deletionDate}
                disabled={disabled}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <RecordLicense
                license={record.license}
                onChange={
                  (license) => onChange('license', license)
                }
                message={validationMessages?.license} 
                disabled={disabled}
              />
            </Col>
          </Row>
          <Row>
            <Col>
                <RecordCollections 
                  collection={record.isPartOf || record.is_part_of}
                  onChange={(value) => onChange('isPartOf', value)} 
                  disabled={disabled}
                />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <RecordSubtitle
                onChange={(value) => onChange('selectedSubtitles', value)}
                message={validationMessages?.selectedSubtitles}
                subtitles={record.selectedSubtitles}
                vttFiles={vttFiles}
                disabled={disabled}
              />
            </Col>
          </Row>
    </Container>
  );
};

RecordForm.propTypes = {
  record: PropTypes.object,
  onChange: PropTypes.func,
  validationMessages: PropTypes.object,
  disabled: PropTypes.bool
};

export default RecordForm;
