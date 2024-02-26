import { FIELD_IS_VALID } from "../../../Constants";

const validateTitle = (title, _record) => {
  if (title.length === 0) {
    return 'record_validation_name_is_empty';
  } else if (title.length > 150) {
    return 'record_validation_name_is_too_long';
  }
  return FIELD_IS_VALID;
};

export default validateTitle;
