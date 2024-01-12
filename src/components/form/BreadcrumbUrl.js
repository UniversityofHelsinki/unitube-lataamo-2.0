import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PropTypes from 'prop-types';

const BreadcrumbUrl = ({crumbs}) => {
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

BreadcrumbUrl.propTypes = {
  crumbs: PropTypes.array.isRequired
};

export default BreadcrumbUrl;
