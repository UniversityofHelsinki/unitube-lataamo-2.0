import { addMonths, addYears } from 'date-fns';
import { DELETION_DATE_MAX_YEARS, DELETION_DATE_MIN_MONTHS } from '../../../Constants';

const midnight = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
};

const validateDeletionDate = (ISO, record) => {
  const date = new Date(ISO);
  const today = midnight(new Date());
  if (!date) {
    return 'record_deletion_date_is_empty';
  } else if (date < addMonths(today, DELETION_DATE_MIN_MONTHS)) {
    return 'record_deletion_date_too_soon';
  } else if (midnight(date) > addYears(today, DELETION_DATE_MAX_YEARS)) {
    return 'record_deletion_date_too_late';
  }
  return false;
};

export default validateDeletionDate;
