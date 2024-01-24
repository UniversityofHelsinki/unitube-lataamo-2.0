import { DEFAULT_LICENSES } from "../../../Constants";

const validateLicense = (license, _record) => {
  if (!DEFAULT_LICENSES.includes(license)) {
    return 'record_validation_license_invalid';
  }
};

export default validateLicense;
