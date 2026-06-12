import { FIELD_IS_VALID } from "../../../Constants";

const contentTypeValidation = (contentType) => {
  if (!contentType) {
    return 'collection_validation_content_type_is_required';
  }

  return FIELD_IS_VALID;
};

export default contentTypeValidation;