import PropTypes from 'prop-types';
import validateTitle from './titleValidation.js';
import validateDescription from './descriptionValidation.js';
import validateLicense from "./licenseValidation";
import validateFile from "./fileValidation.js";
import validateDeletionDate from "./deletionDateValidation.js";
import subtitleFileValidation from "./subtitleFileValidation";
import useValidation from "../useValidation.js";

const validationFunctions = {
  file: validateFile,
  title: validateTitle,
  description: validateDescription,
  license: validateLicense,
  deletionDate: validateDeletionDate,
  subtitleFile: subtitleFileValidation
};

const useRecordValidation = (fields) => {
  const [isValid, messages, validate] = useValidation(validationFunctions, fields);
  return [isValid, messages, validate];
};

useRecordValidation.propTypes = {
  fields: PropTypes.array
};

export default useRecordValidation;
