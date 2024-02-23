import { FIELD_IS_VALID } from "../../../Constants";

const descriptionValidation = (description) => {
  if (!description || description.length === 0) {
    return 'collection_validation_description_is_empty';
  }
  return FIELD_IS_VALID;
};

export default descriptionValidation;
