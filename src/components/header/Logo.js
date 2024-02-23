import React from 'react';
import { useTranslation } from 'react-i18next';
import './Logo.css';

const Logo = () => {
  const { t } = useTranslation();
  return (
    <h1 className="logo">{t('unitube_lataamo')}</h1>
  );
};

Logo.propTypes = {
};

export default Logo;
