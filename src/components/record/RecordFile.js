import React from 'react';
import PropTypes from 'prop-types';
import './RecordFile.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InputField from '../form/InputField';
import { ACCEPTED_MIME_TYPES } from '../../Constants';

const RecordFile = ({ file, message, onChange, disabled = false }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader>{t('record_file_header')}</FormElementHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField onChange={(e) => onChange(e.target.files[0])} type="file" message={message} accept={ACCEPTED_MIME_TYPES} disabled={disabled} />
        </Col>
      </Row>
    </Container>
  );
};

RecordFile.propTypes = {
  file: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
  disabled: PropTypes.bool
};

export default RecordFile;
