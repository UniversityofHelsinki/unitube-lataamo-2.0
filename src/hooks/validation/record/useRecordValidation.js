import PropTypes from 'prop-types';
import useRecordsValidation from './useRecordsValidation.js';

const useRecordValidation = (fields, record) => {
  const [isValids, messages, validate] = useRecordsValidation(
    fields,
    [record]
  );

  return [
    isValids[0], 
    messages[0], 
    (record, previousRecord, validateAllFields) => 
      validate([record], [previousRecord], validateAllFields)
  ];
};

useRecordValidation.propTypes = {
  fields: PropTypes.array
};

export default useRecordValidation;

