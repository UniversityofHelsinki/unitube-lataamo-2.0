import { FIELD_IS_VALID } from "../../../Constants";


const validateTitle = (title) => {
  if (!title || title.length === 0) {
    return 'collection_validation_title_is_empty';
  }
  return FIELD_IS_VALID;
};

export default validateTitle;
