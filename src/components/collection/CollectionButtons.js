import React, {useState} from 'react';
import { addMonths } from 'date-fns';
import './CollectionButtons.css';
import {Button, Form, Modal} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormDialog from "../dialog/FormDialog";
import CollectionRecordsDeletionDates from "./records/CollectionRecordsDeletionDates";
import useModification from "../../hooks/useModification";
import useRecordsDeletionDatesUpdate from '../../hooks/record/useRecordsDeletionDatesUpdate';
import {DELETION_DATE_MIN_MONTHS, ProgressStatus} from "../../Constants";
import DeletionDatesCollectionRecordsFooter from "./records/DeletionDatesCollectionRecordsFooter";
import useValidation from "../../hooks/validation/useValidation.js";
import validateDeletionDate from "../../hooks/validation/record/deletionDateValidation";
import PropTypes from "prop-types";

const CollectionButtons = ({ identifier }) => {
    const { t } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const datePlusSixMonths = addMonths(new Date(),  DELETION_DATE_MIN_MONTHS);
    const [updateExpiryDates, progress, resetProgress] = useRecordsDeletionDatesUpdate();
    const [collectionData, onChange] = useModification( {identifier: identifier, deletionDate: datePlusSixMonths.toISOString()}, resetProgress );
    const validationFunctions = {
        deletionDate: validateDeletionDate,
    };
    const [isValid, messages, validate] = useValidation(validationFunctions, ['deletionDate']);
    const show = () => setShowForm(true);

    const reset = () => {
        onChange('deletionDate', datePlusSixMonths.toISOString());
        resetProgress();
    };

    const hide = () => {
        reset();
        setShowForm(false);
    };

    const changeDeletionDay = (what, value) => {
        onChange(what, value);
        validate({...collectionData, [what]: value}, collectionData);
    };

    const onSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        const seriesId = identifier;
        const updatedDeletionDate = { deletionDate : collectionData?.deletionDate};
        await updateExpiryDates(seriesId, updatedDeletionDate);
    };

    const formDisabled = progress.status !== ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.NOT_STARTED;
    const closeable = progress.status !== ProgressStatus.COLLECTION_RECORDS_DELETION_DATE_SAVE.IN_PROGRESS;

    const theButton = (
        <>
            <div className="collection-buttons-bar-buttons">
                <Button
                    variant="primary"
                    className="collection-buttons-update-end-dates-button"
                    onClick={show}
                    aria-haspopup="dialog"
                >
                    {t('update_collection_end_dates')}
                </Button>
            </div>
        </>
    );

    return (
        <FormDialog
            hide={hide}
            showComponent={theButton}
            show={showForm}
            closeable={closeable}
        >
            <Modal.Header closeButton={closeable}>{t('update_collection_end_dates')}</Modal.Header>
            <Form className="collection-buttons-update-end-dates-form ms-3 me-3" onSubmit={onSubmit}>
                <Modal.Body>
                    <CollectionRecordsDeletionDates deletionDate={collectionData?.deletionDate}
                        onChange={(deletionDate) => changeDeletionDay('deletionDate', deletionDate.toISOString())}
                        disabled={formDisabled} message={messages.deletionDate} />
                </Modal.Body>
                <Modal.Footer className="ps-0 pe-0">
                    <DeletionDatesCollectionRecordsFooter progress={progress} hide={hide} />
                </Modal.Footer>
            </Form>
        </FormDialog>
    );
};

CollectionButtons.propTypes = {
    identifier: PropTypes.string
};

export default CollectionButtons;
