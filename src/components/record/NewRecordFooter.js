import React from 'react';
import PropTypes from 'prop-types';
import './NewRecordFooter.css';
import NewRecordProgress from './NewRecordProgress';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { ProgressStatus } from '../../Constants';
import { useTranslation } from 'react-i18next';
import HyButton from '../utilities/HyButton';

const SendButton = ({ disabled, label }) => {
  return <HyButton type="submit" variant="primary" disabled={disabled}>{label}</HyButton>;
};

const CancelButton = ({ onClick, disabled, label }) => {
  return <HyButton variant="secondary" onClick={onClick} disabled={disabled}>{label}</HyButton>
};


const NewRecordFooter = ({ progress, onCancel, isValid, onClick }) => {
  const { t } = useTranslation();

  if (progress.status === ProgressStatus.NEW_RECORD.NOT_STARTED) {
      return (<>
        <CancelButton onClick={onCancel} disabled={false} label={t('new_record_cancel_button_label')} />
        <SendButton disabled={!isValid} label={t('new_record_save_button_label')} />
      </>);
  }

  const buttonLabel = ({
    [ProgressStatus.NEW_RECORD.ERROR]: t('new_record_footer_button_error'),
    [ProgressStatus.NEW_RECORD.DONE]: t('new_record_footer_button_done'),
    [ProgressStatus.NEW_RECORD.SENDING]: t('new_record_footer_button_sending'),
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLES]: t('new_record_footer_button_sending_subtitles'),
    [ProgressStatus.NEW_RECORD.PROCESSING_SUBTITLES]: t('new_record_footer_button_processing'),
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER]: t('new_record_footer_button_sending_subtitle_order'),
    [ProgressStatus.NEW_RECORD.PROCESSING]: t('new_record_footer_button_processing')
  })[progress.status] || '';

  const buttonDisabled = ({
    [ProgressStatus.NEW_RECORD.ERROR]: false,
    [ProgressStatus.NEW_RECORD.DONE]: false,
    [ProgressStatus.NEW_RECORD.SENDING]: true,
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLES]: true,
    [ProgressStatus.NEW_RECORD.PROCESSING_SUBTITLES]: true,
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER]: true,
    [ProgressStatus.NEW_RECORD.PROCESSING]: true
  })[progress.status] ? { disabled: true } : {};


  return (
    <Container className="new-record-footer">
      <Row>
        <Col className="new-record-footer-progress-bar">
          <NewRecordProgress progress={progress} />
        </Col>
        <Col className="new-record-footer-button">
          <HyButton variant="primary" onClick={onClick} { ...buttonDisabled }><span>{buttonLabel}</span></HyButton>
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
