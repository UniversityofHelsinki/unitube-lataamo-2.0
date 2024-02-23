import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordFile.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InputField from '../form/InputField';
import { ACCEPTED_MIME_TYPES } from '../../Constants';
import HelpDialog from "../dialog/HelpDialog";

const RecordFile = ({ message, onChange, disabled = false }) => {
  const { t } = useTranslation();
  const id = useId();

  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader componentId={id}>{t('record_file_header')}</FormElementHeader>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
            <HelpDialog label={t('record_upload_help_label')} >
                {t('record_upload_help_content')}
            </HelpDialog>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputField id={id} onChange={(e) => onChange(e.target.files[0])} type="file" message={message} accept={ACCEPTED_MIME_TYPES} disabled={disabled} />
        </Col>
      </Row>

    </Container>
  );
};

RecordFile.propTypes = {
  onChange: PropTypes.func.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
  disabled: PropTypes.bool
};

export default RecordFile;
