import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionRecordsDeletionDates.css';
import FormElementHeader from '../../form/FormElementHeader';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../form/DatePicker';
import { addMonths, addYears } from 'date-fns';
import { DELETION_DATE_MAX_YEARS, DELETION_DATE_MIN_MONTHS } from '../../../Constants';
import HelpDialog from '../../dialog/HelpDialog';
const CollectionRecordsDeletionDates = ({ deletionDate, onChange, message, disabled = false }) => {
    const { t } = useTranslation();
    const id = useId();
    const calendarOpenDate = (() => {
        if (deletionDate > addMonths(new Date(), DELETION_DATE_MIN_MONTHS)) {
            return deletionDate;
        }
        return addMonths(new Date(), DELETION_DATE_MIN_MONTHS);
    })();

    return (
        <Container className="collection-records-end-dates">
            <Row>
                <Col>
                    <FormElementHeader componentId={id}>
                        {t('collection_records_deletion_dates_header')}
                    </FormElementHeader>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <HelpDialog label={t('collection_records_deletion_dates_help_label')}>
                        {t('collection_records_deletion_dates_help_content')}
                    </HelpDialog>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DatePicker
                        selected={deletionDate && new Date(deletionDate)}
                        openToDate={calendarOpenDate}
                        minDate={addMonths(new Date(), DELETION_DATE_MIN_MONTHS)}
                        maxDate={addYears(new Date(), DELETION_DATE_MAX_YEARS)}
                        onChange={onChange}
                        message={message}
                        disabled={disabled}
                        id={id}
                    />
                </Col>
            </Row>
        </Container>
    );
};

CollectionRecordsDeletionDates.propTypes = {
    deletionDate: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    disabled: PropTypes.bool,
};
export default CollectionRecordsDeletionDates;
