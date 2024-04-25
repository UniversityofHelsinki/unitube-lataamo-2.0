import React from 'react';
import PropTypes from 'prop-types';
import './DeleteCollectionFooter.css';
import { Button } from 'react-bootstrap';
import { ProgressStatus } from '../../Constants';
import AlertMessage from '../utilities/AlertMessage';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';

const DeleteCollectionFooter = ({ progress, hide }) => {
    const { t } = useTranslation();

    const progressBarLabel = {
        [ProgressStatus.COLLECTION_DELETE.NOT_STARTED]: '',
        [ProgressStatus.COLLECTION_DELETE.IN_PROGRESS]: t('delete_collection_footer_in_progress'),
        [ProgressStatus.COLLECTION_DELETE.DONE]: t('delete_collection_footer_done'),
        [ProgressStatus.COLLECTION_DELETE.ERROR]: progress.message || t('delete_collection_footer_error')
    }[progress.status] || '';

    const progressBarType = {
        [ProgressStatus.COLLECTION_DELETE.DONE]: 'done',
        [ProgressStatus.COLLECTION_DELETE.ERROR]: 'error',
    }[progress.status] || '';

    const alertMessage = {
        [ProgressStatus.COLLECTION_DELETE.DONE]: (
            <AlertMessage type="transparent" slim={true}>
                {t('delete_collection_footer_done_alert')}
            </AlertMessage>
        )
    }[progress.status] || <></>;

    const progressBarProps = {
        label: progressBarLabel,
        now: progress.percentage,
        animated: progress.status === ProgressStatus.COLLECTION_DELETE.IN_PROGRESS,
        alertMessage,
        type: progressBarType
    };

    const cancelButtonLabel =  {
        [ProgressStatus.COLLECTION_DELETE.DONE]: t('delete_collection_footer_close_button'),
        [ProgressStatus.COLLECTION_DELETE.IN_PROGRESS]: t('delete_collection_footer_cancel_button'),
        [ProgressStatus.COLLECTION_DELETE.ERROR]: t('delete_collection_footer_cancel_button'),
        [ProgressStatus.COLLECTION_DELETE.NOT_STARTED]: t('delete_collection_footer_cancel_button')
    }[progress.status]

    const deleteInProgress = progress.status === ProgressStatus.COLLECTION_DELETE.IN_PROGRESS;
    const deleteDone = progress.status === ProgressStatus.COLLECTION_DELETE.DONE;
    const deleteError = progress.status === ProgressStatus.COLLECTION_DELETE.ERROR;

    return (
        <div className="delete-collection-footer">
            {(deleteInProgress || deleteDone || deleteError) &&
                <div className="delete-collection-footer-progress-bar">
                    <ProgressBar { ...progressBarProps } />
                </div>}
            <div className="delete-collection-footer-buttons">
                <Button variant="outline-secondary" onClick={hide} disabled={deleteInProgress}>
                    {cancelButtonLabel}
                </Button>
                <Button variant="danger" type="submit" disabled={deleteInProgress || deleteDone}>
                    {t('delete_collection_footer_submit_button')}
                </Button>
            </div>
        </div>
    );
};

DeleteCollectionFooter.propTypes = {
    progress: PropTypes.shape({
        status: PropTypes.oneOf(Object.values(ProgressStatus.COLLECTION_DELETE)),
        percentage: PropTypes.number,
    }),
    hide: PropTypes.func
};

export default DeleteCollectionFooter;
