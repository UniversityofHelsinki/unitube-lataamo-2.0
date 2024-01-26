import React from 'react';
import PropTypes from 'prop-types';
import './NewRecordFooter.css';
import NewRecordProgress from './NewRecordProgress';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { ProgressStatus } from '../../Constants';
import { useTranslation } from 'react-i18next';

const SendButton = ({ disabled, label }) => {
  return <Button type="submit" variant="primary" disabled={disabled}>{label}</Button>;
};

const CancelButton = ({ onClick, disabled, label }) => {
  return <Button variant="outline-secondary" onClick={onClick} disabled={disabled}>{label}</Button>
};


const NewRecordFooter = ({ progress, onCancel, isValid, onClick }) => {
  const { t } = useTranslation();

  if (progress.status === ProgressStatus.NOT_STARTED) {
      return (<>
        <CancelButton onClick={onCancel} disabled={false} label={t('new_record_cancel_button_label')} />
        <SendButton disabled={!isValid} label={t('new_record_save_button_label')} />
      </>);
  }

  const buttonLabel = ({
    [ProgressStatus.ERROR]: t('new_record_footer_button_error'),
    [ProgressStatus.DONE]: t('new_record_footer_button_done'),
    [ProgressStatus.SENDING]: t('new_record_footer_button_sending'),
    [ProgressStatus.PROCESSING]: t('new_record_footer_button_processing')
  })[progress.status] || '';

  const buttonDisabled = ({
    [ProgressStatus.ERROR]: false,
    [ProgressStatus.DONE]: false,
    [ProgressStatus.SENDING]: true,
    [ProgressStatus.PROCESSING]: true
  })[progress.status] ? { disabled: true } : {};


  return (
    <Container className="new-record-footer">
      <Row>
        <Col className="new-record-footer-progress-bar">
          <NewRecordProgress progress={progress} />
        </Col>
        <Col className="new-record-footer-button">
          <Button variant="primary" onClick={onClick} { ...buttonDisabled }><span>{buttonLabel}</span></Button>
        </Col>
      </Row>
    </Container>
  );
};

NewRecordFooter.propTypes = {
  progress: PropTypes.shape({
    status: PropTypes.string,
    percentage: PropTypes.number,
    timeLeft: PropTypes.number
  }),
  onCancel: PropTypes.func,
  isValid: PropTypes.bool
};

export default NewRecordFooter;
