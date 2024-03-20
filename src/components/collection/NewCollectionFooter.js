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

  const cancelButtonLabel =  {
    [ProgressStatus.NEW_COLLECTION.DONE]: t('new_collection_form_footer_close'),
    [ProgressStatus.NEW_COLLECTION.SENDING]: t('new_collection_form_footer_cancel'),
    [ProgressStatus.NEW_COLLECTION.ERROR]: t('new_collection_form_footer_cancel'),
    [ProgressStatus.NEW_COLLECTION.NOT_STARTED]: t('new_collection_form_footer_cancel')
  }[progress.status]

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
    <div className="new-collection-footer">
      <div className="new-collection-footer-progress-bar">
        {progressBar}
      </div>
      <div className="new-collection-footer-buttons">
        <Button variant="outline-secondary" onClick={onCancel}>
          {cancelButtonLabel}
        </Button>
        <Button variant="primary" type="submit" disabled={submitButtonDisabled || !isValid}>
          {submitButtonLabel}
        </Button>
      </div>
    </div>
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
