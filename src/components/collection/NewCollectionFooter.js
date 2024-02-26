import React from 'react';
import PropTypes from 'prop-types';
import './NewCollectionFooter.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import NewCollectionProgressBar from './NewCollectionProgressBar';
import { ProgressStatus } from '../../Constants';

const NewCollectionFooter = ({ onCancel, progress, isValid }) => {
  const { t } = useTranslation();

  const progressBar = (() => {
    if (progress.status !== ProgressStatus.NEW_COLLECTION.NOT_STARTED) {
      return <NewCollectionProgressBar progress={progress} />;
    }
    return <></>;
  })();

  const submitButtonLabel = {
    [ProgressStatus.NEW_COLLECTION.NOT_STARTED]: t('new_collection_form_footer_submit'),
    [ProgressStatus.NEW_COLLECTION.SENDING]: t('new_collection_form_footer_sending'),
    [ProgressStatus.NEW_COLLECTION.ERROR]: t('new_collection_form_footer_error'),
    [ProgressStatus.NEW_COLLECTION.DONE]: t('new_collection_form_footer_done')
  }[progress.status] || t('new_collection_form_footer_submit');

  const submitButtonDisabled = {
    [ProgressStatus.NEW_COLLECTION.SENDING]: true
  }[progress.status] || false;

  return (
    <Container className="new-collection-footer">
      <Row className="pe-0">
        <Col sm={8} className="new-collection-footer-progress-row">
          {progressBar}
        </Col>
        <Col sm={4} className="new-collection-footer-button-row text-end pe-0">
          <Button variant="outline-secondary" className="me-2" onClick={onCancel}>
            {t('new_collection_form_footer_cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={submitButtonDisabled || !isValid}>
            {submitButtonLabel}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

NewCollectionFooter.propTypes = {
  onCancel: PropTypes.func,
  progress: PropTypes.shape({ 
    status: PropTypes.string, 
    percentage: PropTypes.number,
    message: PropTypes.any
  }),
  isValid: PropTypes.bool,
};

export default NewCollectionFooter;
