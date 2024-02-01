import React from 'react';
import Breadcrumb from './Breadcrumb';
import './Breadcrumb.css';
import PropTypes from "prop-types";

const RecordsBreadCrumb = ({crumbs}) => {

    return (
        <Breadcrumb crumbs={crumbs} />
    );
};

RecordsBreadCrumb.propTypes = {
    crumbs: PropTypes.array.isRequired,
};

export default RecordsBreadCrumb;
