import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import './RadioButtonGroup.css';
import {useTranslation} from "react-i18next";


const RadioButtonGroup = ({ options, onChange, value, ...rest }) => {
    const { t } = useTranslation();

    return (
        <>
            {options.map(option =>
                <Form.Check className="radio-button-group" type="radio" checked={value === option.value} key={option.value} value={option.value}
                            label={t(option.label) } onChange={(e) => onChange(e.target.value)}  />
            )}
        </>
    );
}

RadioButtonGroup.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};
export default RadioButtonGroup;
