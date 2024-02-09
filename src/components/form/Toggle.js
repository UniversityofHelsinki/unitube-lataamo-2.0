import React, {useId, useState} from 'react';
import PropTypes from "prop-types";
import './Toggle.css';

const Toggle = ({ children, labels}) => {
    const [visibleComponentIndex, setVisibleComponentIndex] = useState(-1);
    const id = useId();
    const changeVisibleComponent = ( index ) => {
        setVisibleComponentIndex(index);
    };

    return (
        <ul style={{"listStyle": "none", "paddingLeft": "inherit"}}>
            {children.map((item, index) => {
                const checked =  index === visibleComponentIndex;
                 return (<li key={`${id}-${index}`}>
                                <input style={{ "marginRight": "0.25em"}} name={`${id}`}  id={`${id}-${index}`} type='radio' value={index} defaultChecked={checked}
                                       onChange={() => changeVisibleComponent(index)} />
                                <label htmlFor={`${id}-${index}`}>{labels[index]}</label>
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
