import { FIELD_IS_VALID } from "../../../Constants";

const descriptionValidation = (description) => {
  if (!description || description.length === 0) {
    return 'collection_validation_description_is_empty';
  }

  if (description.length > 1500) {
    return 'collection_validation_description_is_too_long';
  }

  return FIELD_IS_VALID;
};

export default descriptionValidation;
