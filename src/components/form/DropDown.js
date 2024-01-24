import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
const DropDown = ( {defaultValue, optionsarray}) => {
    const listOptions = (options) => {
        return options.map((elem) => {
            return <option value={elem.value} label={elem.label}></option>;
        });
    };

    return (
        <Form.Select type="checkbox">
            <option value="">{defaultValue}</option>
            {listOptions(optionsarray)}
        </Form.Select>
    );
}

DropDown.propTypes= {
    defaultValue: PropTypes.string.isRequired,
    optionsarray: PropTypes.array.isRequired
};
export default DropDown;
