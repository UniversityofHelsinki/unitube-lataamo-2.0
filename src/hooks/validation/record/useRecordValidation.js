import PropTypes from 'prop-types';
import validateTitle from './titleValidation.js';
import validateDescription from './descriptionValidation.js';
import validateLicense from "./licenseValidation";
import validateFile from "./fileValidation.js";
import { validateExistingDeletionDate } from "./deletionDateValidation.js";
import useValidation from "../useValidation.js";
import validateSubtitles from './subtitleValidation.js';

const validationFunctions = (record) => ({
  file: validateFile,
  title: validateTitle,
  description: validateDescription,
  license: validateLicense,
  deletionDate: validateExistingDeletionDate(record),
  subtitles: validateSubtitles
});

const useRecordValidation = (fields, record) => {
  const [isValid, messages, validate] = useValidation(
    validationFunctions(record), 
    fields
  );

  return [isValid, messages, validate];
};

useRecordValidation.propTypes = {
  fields: PropTypes.array
};

export default useRecordValidation;

