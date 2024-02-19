import React, {useId, useState} from 'react';
import PropTypes from "prop-types";
import './Toggle.css';
import ElementHeader from './ElementHeader';

const Toggle = ({ children, labels }) => {
    const [visibleComponentIndex, setVisibleComponentIndex] = useState(-1);
    const id = useId();
    const changeVisibleComponent = ( index ) => {
        setVisibleComponentIndex(index);
    };

    return (
        <ul className="toggle form-check">
            {children.map((item, index) => {
                const checked =  index === visibleComponentIndex;
                 return (<li key={`${id}-${index}`} className="mb-1">
                    <input className="form-check-input" name={id} id={`${id}-${index}`} type='radio' value={index} defaultChecked={checked}
                           onChange={() => changeVisibleComponent(index)} />
                    <label className="form-check-label align-middle" htmlFor={`${id}-${index}`}>
                     <ElementHeader label={labels[index]}>{labels[index]}</ElementHeader>
                   </label>
                   {checked && item}
                </li>);
            })}
        </ul>
    );
}

Toggle.propTypes = {
    children: PropTypes.any,
    labels: PropTypes.array
};
export default Toggle;
