import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.css';
import { useTranslation } from 'react-i18next';

const Breadcrumb = ({crumbs}) => {
    const { t } = useTranslation();
    return (
        <div className="breadcrumb">
          <nav aria-label={t('breadcrumb_navigation_label')}>
            <ol>
              {crumbs.map((crumb, i) => 
              <React.Fragment key={i}>
                <li>
                  {i > 0 ? <span aria-hidden className="breadcrumb-divider"></span> : <></>}
                  {crumb}
                </li>
              </React.Fragment>
              )}
            </ol>
          </nav>
        </div>
    );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.array.isRequired
};

export default Breadcrumb;
