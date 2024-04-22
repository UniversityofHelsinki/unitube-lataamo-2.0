import React from 'react';
import PropTypes from 'prop-types';
import './RecordTag.css';
import { Badge } from 'react-bootstrap';

const background = {
    blue: 'primary',
    grey: 'secondary',
    green: 'success',
    orange: 'warning',
    red: 'danger',
    brightblue: 'info',
    white: 'light',
    black: 'dark',
    light: 'light'
};

const RecordTag = ({ label, color }) => {

    return (
        <Badge className="record-tag" bg={background[color]} title={label} >{label}</Badge>
    );
};

RecordTag.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf(Object.keys(background)).isRequired
};

export default RecordTag;
