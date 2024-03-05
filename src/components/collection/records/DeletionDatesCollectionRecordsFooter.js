import React from 'react';
import PropTypes from 'prop-types';
import './DeletionDatesCollectionRecordsFooter.css';
import { ProgressStatus } from '../../../Constants';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../../form/ProgressBar';
import AlertMessage from '../../utilities/AlertMessage';

const DeletionDatesCollectionRecordsFooter = ({ progress, hide }) => {
    const { t } = useTranslation();

    const progressBarLabel = {
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.NOT_STARTED]: '',
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.IN_PROGRESS]: t('deletion_dates_collection_records_footer_in_progress'),
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.DONE]: t('deletion_dates_collection_records_footer_done'),
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.ERROR]: progress.message || t('rdeletion_dates_collection_records_footer_error')
    }[progress.status];

    const animated = progress.status === ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.IN_PROGRESS;

    const progressBarType = {
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.DONE]: 'done',
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.ERROR]: 'error',
    }[progress.status] || '';

    const progressBarProps = {
        label: progressBarLabel,
        now: progress.percentage,
        animated,
        alertMessage: <></>,
        type: progressBarType
    };

    const alertMessage = {
        [ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.DONE]: (
            <AlertMessage type="transparent" slim={true}>
                {t('deletion_dates_collection_records_footer_done_alert')}
            </AlertMessage>
        )
    }[progress.status] || <></>;

    const deletionDateSaveInProgress = progress.status === ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.IN_PROGRESS;
    const deletionDateSaveDone = progress.status === ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.DONE;
    const deletionDateSaveError = progress.status === ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.ERROR;

    const submitButtonLabel = (() => {
        if (deletionDateSaveError) {
            return t('deletion_dates_collection_records_footer_error_button');
        }
        return t('deletion_dates_collection_records_footer_save_button');
    })();

    return (
        <div className="deletion-dates-collection-records-footer">
            {(deletionDateSaveInProgress || deletionDateSaveDone || deletionDateSaveError) &&
                <div className="deletion-dates-collection-records-footer-progress-bar">
                    <ProgressBar { ...progressBarProps } alertMessage={alertMessage} />
                </div>}
            <div className="deletion-dates-collection-records-footer-buttons">
                <Button variant="outline-secondary" onClick={hide} disabled={deletionDateSaveInProgress || deletionDateSaveDone}>
                    {t('deletion_dates_collection_records_footer_cancel_button')}
                </Button>
                <Button variant="primary" type="submit" disabled={deletionDateSaveInProgress || deletionDateSaveDone}>
                    {submitButtonLabel}
                </Button>
            </div>
        </div>
    );
};

DeletionDatesCollectionRecordsFooter.propTypes = {
    progress: PropTypes.shape({
        status: PropTypes.oneOf(Object.values(ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE)),
        percentage: PropTypes.number
    }),
    hide: PropTypes.func
};

export default DeletionDatesCollectionRecordsFooter;
