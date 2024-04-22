import useValidation from "../useValidation";
import { validateExistingDeletionDate } from "./deletionDateValidation";
import validateDescription from "./descriptionValidation";
import validateFile from "./fileValidation";
import validateLicense from "./licenseValidation";
import validateSubtitles from "./subtitleValidation";
import validateTitle from "./titleValidation";

const validationFunctions = (record) => ({
  file: validateFile,
  title: validateTitle,
  description: validateDescription,
  license: validateLicense,
  deletionDate: validateExistingDeletionDate(record),
  subtitles: validateSubtitles
});

const useRecordsValidation = (fields, records = []) => {
  const [isValids, messages, validate] = useValidation(
    records.map(record => validationFunctions(record)),
    fields
  );

  return [isValids, messages, validate];
};

export default useRecordsValidation;
