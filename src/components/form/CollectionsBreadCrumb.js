import React from 'react';
import Breadcrumb from './Breadcrumb';
import PropTypes from "prop-types";

const CollectionsBreadCrumb = ({crumbs}) => {

    return (
        <Breadcrumb crumbs={crumbs} />
    );
};

CollectionsBreadCrumb.propTypes = {
    crumbs: PropTypes.array.isRequired,
};

export default CollectionsBreadCrumb;
