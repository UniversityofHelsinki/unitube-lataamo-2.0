import { DEFAULT_LICENSES } from "../../../Constants";
import PropTypes from 'prop-types';

const validateLicense = (license, _record) => {
  if (!DEFAULT_LICENSES.includes(license)) {
    return 'record_validation_license_invalid';
  }
};

validateLicense.PropTypes = {
    license: PropTypes.string,
    record: PropTypes.object
}

export default validateLicense;
