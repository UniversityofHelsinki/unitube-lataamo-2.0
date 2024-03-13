import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';
import HyLogo from './HyLogo';
import { useTranslation } from 'react-i18next';

const Loading = ({ children, renderChildren = false, loading = false, logo = true }) => {
  const { t } = useTranslation();

  if (loading && renderChildren) {
    return (
      <div className="loading">
        {children}
      </div>
    );
  } else if (loading && logo) {
    return (
      <div className="loading">
        <HyLogo className="spin" />
        <p>{t('loading')}</p>
      </div>
    );
  } else if (loading) {
    return (
      <div className="loading">
        <p>{t('loading')}</p>
      </div>
    );
  }
  return (
    children
  );
};

Loading.propTypes = {
  children: PropTypes.object.isRequired,
  renderChildren: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

export default Loading;
