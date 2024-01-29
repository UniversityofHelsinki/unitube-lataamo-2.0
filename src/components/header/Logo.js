import React from 'react';
import { useTranslation } from 'react-i18next';
import './Logo.css';

const Logo = () => {
  const { t } = useTranslation();
  return (
    <h2 className="logo">{t('unitube_lataamo')}</h2>
  );
};

Logo.propTypes = {
};

export default Logo;
