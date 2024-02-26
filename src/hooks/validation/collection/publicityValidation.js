import { FIELD_IS_VALID, PUBLICITIES } from "../../../Constants";

const publicityValidation = (publicity) => {
  if (!PUBLICITIES.map(p => p.value).includes(publicity)) {
    return 'collection_validation_publicity_not_recognized';
  }
  return FIELD_IS_VALID;
};

export default publicityValidation;
