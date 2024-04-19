import PropTypes from 'prop-types';
import validateTitle from './titleValidation.js';
import validateDescription from './descriptionValidation.js';
import validateLicense from "./licenseValidation";
import validateFile from "./fileValidation.js";
import validateDeletionDate from "./deletionDateValidation.js";
import useValidation from "../useValidation.js";
import validateSubtitles from './subtitleValidation.js';

const validationFunctions = {
  file: validateFile,
  title: validateTitle,
  description: validateDescription,
  license: validateLicense,
  deletionDate: validateDeletionDate,
  subtitles: validateSubtitles
};

const useNewRecordValidation = (fields) => {
  const [isValid, messages, validate] = useValidation(validationFunctions, fields);

  return [isValid, messages, validate];
};

useNewRecordValidation.propTypes = {
  fields: PropTypes.array
};

export default useNewRecordValidation;
