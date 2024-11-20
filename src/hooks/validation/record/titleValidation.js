import { FIELD_IS_VALID, FORBIDDEN_CHARACTERS } from "../../../Constants";

const validateTitle = (title, _record) => {
  if (title.length === 0) {
    return 'record_validation_name_is_empty';
  } else if (title.length > 150) {
    return 'record_validation_name_is_too_long';
  } else if (FORBIDDEN_CHARACTERS.test(title)) {
    return 'record_validation_title_contains_forbidden_characters';
  }
  return FIELD_IS_VALID;
};

export default validateTitle;
