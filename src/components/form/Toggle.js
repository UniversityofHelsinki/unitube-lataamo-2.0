import React, {useId, useState} from 'react';
import PropTypes from "prop-types";
import './Toggle.css';
import ElementHeader from './ElementHeader';
import {useSelector} from "react-redux";

const Toggle = ({ children, labels, onSelect, selected, disabled }) => {
    const id = useId();

    const changeVisibleComponent = (index) => {
        onSelect(index);
    };

    const areVTTFilesEmpty = (vttFiles) => {
        if (!vttFiles || Object.keys(vttFiles).length === 0) return true;
        return Object.values(vttFiles).every(file => file.url === "empty.vtt");
    };


    return (
        <ul className="toggle form-check">
            {children.map((item, index) => {
                if (item === null) return null;
                const isItemDisabled = disabled || (item.props.vttFiles && areVTTFilesEmpty(item.props.vttFiles));
                const checked = index === selected;
                 return (<li key={`${id}-${index}`} className="mb-1">
                    <input
                      className="form-check-input"
                      name={id}
                      id={`${id}-${index}`}
                      type='radio'
                      value={index}
                      checked={checked}
                      onChange={() => changeVisibleComponent(index)}
                      onClick={() => checked && changeVisibleComponent(index)}
                      disabled={isItemDisabled}
                    />
                     <label className="form-check-label align-middle" htmlFor={`${id}-${index}`}>
                       <span className="form-check-label-content">{labels[index]}</span>
                     </label>
                   {checked && item}
                </li>);
            })}
        </ul>
    );
}

Toggle.propTypes = {
    children: PropTypes.any,
    labels: PropTypes.array,
    onSelect: PropTypes.func,
};
export default Toggle;
