import React from 'react';
import { useTranslation } from 'react-i18next';
import HelpDialog from '../components/dialog/HelpDialog';
import RecordErrorPage from '../components/record/RecordErrorPage';
import useUser from './useUser';

const recordIsDeleted = (record, user) => {
  const isInTrash = record?.series.title === `trash ${user.eppn}`;
  return isInTrash;
};

const recordIsInProgress = (record) => {
  return record?.processing_state === 'RUNNING' || record?.status === 'EVENTS.EVENTS.STATUS.PROCESSING';
};

const useRecordError = (record, httpError, reload) => {
  const { t } = useTranslation();
  const [user] = useUser();
  if (httpError) {
    const is404 = httpError.source.cause?.status === 404;
    return <RecordErrorPage
      helpDialog={
        <HelpDialog
          label={t('record_error_page_http_help_label')}>
          {t('record_error_page_http_help_content')}
        </HelpDialog>
      }>
      <div className="record-error-page-content">
        <span><b>{httpError.source.cause?.status}</b></span>
        {is404 ? t('record_error_page_http_not_found_content') : t('record_error_page_http_content')}
      </div>
    </RecordErrorPage>
  }

  if (recordIsDeleted(record, user)) {
    return <RecordErrorPage
      helpDialog={
        <HelpDialog 
          label={t('record_error_page_deleted_help_label')}>
          {t('record_error_page_deleted_help_content')}
        </HelpDialog>
      }
      record={{ ...record, series: record.series.title }}
      showActions={true}>
      <div className="record-error-page-content">
        <span><b>{record.title}</b></span>
        {t('record_error_page_deleted_content')}
      </div>
    </RecordErrorPage>
  }

  if (recordIsInProgress(record)) {
    return <RecordErrorPage
      helpDialog={
        <HelpDialog
          label={t('record_error_page_processing_help_label')}>
          {t('record_error_page_processing_help_content')}
        </HelpDialog>
      }
      record={record}
      reload={reload}>
      <div className="record-error-page-content">
        <span><b>{record.title}</b></span>
        {t('record_error_page_processing_content')}
      </div>
    </RecordErrorPage>

  }

  return null;
};

export default useRecordError;
