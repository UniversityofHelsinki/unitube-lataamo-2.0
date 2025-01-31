import { addMonths, addYears } from 'date-fns';
import { DELETION_DATE_MAX_YEARS, DELETION_DATE_MIN_MONTHS, FIELD_IS_VALID } from '../../../Constants';
import PropTypes from 'prop-types';

const midnight = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};

const validateDeletionDate = (ISO, _record) => {
  const date = new Date(ISO);
  const today = midnight(new Date());
  if (!ISO || !date) {
    return 'record_validation_deletion_date_is_empty';
  } else if (date < addMonths(today, DELETION_DATE_MIN_MONTHS)) {
    return 'record_validation_deletion_date_too_soon';
  } else if (midnight(date) > addYears(today, DELETION_DATE_MAX_YEARS)) {
    return 'record_validation_deletion_date_too_late';
  }
  return FIELD_IS_VALID;
};

export const validateExistingDeletionDate = (record) => {
  const originalDeletionDate = new Date(record?.deletionDate);
  const today = midnight(new Date());
  return (ISO, _record) => {
    const date = new Date(ISO);
    const equalsOriginal = !(date < originalDeletionDate || date > originalDeletionDate);
    if (!ISO || !date) {
      return 'record_validation_deletion_date_is_empty';
    } else if (!equalsOriginal && date < addMonths(today, DELETION_DATE_MIN_MONTHS)) {
      return 'record_validation_deletion_date_too_soon';
    } else if (midnight(date) > addYears(today, DELETION_DATE_MAX_YEARS)) {
      return 'record_validation_deletion_date_too_late';
    }
  };
};

validateDeletionDate.PropTypes = {
  ISO: PropTypes.string,
  record: PropTypes.object
};

export default validateDeletionDate;
