import React from 'react';
import PropTypes from 'prop-types';
import './RecordEndDate.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DatePicker from '../form/DatePicker';
import { addMonths, addYears } from 'date-fns';
import { DELETION_DATE_MAX_YEARS, DELETION_DATE_MIN_MONTHS } from '../../Constants';

const RecordEndDate = ({ endDate, onChange, message }) => {
  const { t } = useTranslation();

  const calendarOpenDate = (() => {
    if (endDate > addMonths(new Date(), DELETION_DATE_MIN_MONTHS)) {
      return endDate;
    }
    return addMonths(new Date(), DELETION_DATE_MIN_MONTHS);
  })();

  return (
    <Container className="record-end-date">
      <Row>
        <Col>
          <FormElementHeader>
            {t('record_form_end_date_header')}
          </FormElementHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <DatePicker 
            selected={new Date(endDate)} 
            openToDate={calendarOpenDate}
            minDate={addMonths(new Date(), DELETION_DATE_MIN_MONTHS)}
            maxDate={addYears(new Date(), DELETION_DATE_MAX_YEARS)} 
            onChange={onChange}
            message={message}
          />
        </Col>
      </Row>
    </Container>
  );
};

RecordEndDate.propTypes = {
  endDate: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  })
};

export default RecordEndDate;
