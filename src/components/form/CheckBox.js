import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import InputField from "./InputField";

const CheckBox = ({ label, ...rest }) => {
    return (
        <Form.Check type="checkbox" label={label} { ...rest } />
    );
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
};
export default CheckBox;
