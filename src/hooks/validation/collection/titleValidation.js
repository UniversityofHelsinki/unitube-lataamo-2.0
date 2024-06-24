import { FIELD_IS_VALID } from "../../../Constants";


const validateTitle = (title) => {
  if (!title || title.length === 0) {
    return 'collection_validation_title_is_empty';
  }

  if (title.toLowerCase().includes('inbox')) {
    return 'collection_validation_title_contains_illegal_word';
  }

  return FIELD_IS_VALID;
};

export default validateTitle;
