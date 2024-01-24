const validateDescription = (description, _record) => {
  if (description.length === 0) {
    return 'record_validation_description_is_empty';
  } else if (description.length > 1500) {
    return 'record_validation_description_is_too_long';
  }
  return false;
};

export default validateDescription;
