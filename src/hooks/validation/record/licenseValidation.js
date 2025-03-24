import {DEFAULT_LICENSES_FOR_VALIDATION, FIELD_IS_VALID} from "../../../Constants";
import PropTypes from 'prop-types';

const validateLicense = (license, _record) => {
  if (!DEFAULT_LICENSES_FOR_VALIDATION.includes(license)) {
    return 'record_validation_license_invalid';
  }
  return FIELD_IS_VALID;
};

validateLicense.PropTypes = {
    license: PropTypes.string,
    record: PropTypes.object
}

export default validateLicense;
