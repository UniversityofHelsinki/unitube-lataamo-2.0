import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PropTypes from 'prop-types';
import './BreadCrumbUrl.css';

const BreadCrumbUrl = ({crumbs}) => {
    return (
      <Breadcrumb>
          {crumbs.map(crumb => (
              <Breadcrumb.Item key={crumb} href="#" active>
                {crumb}
              </Breadcrumb.Item>
          ))}
      </Breadcrumb>
    );
}

BreadCrumbUrl.propTypes = {
  crumbs: PropTypes.array.isRequired
};

export default BreadCrumbUrl;
