import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ExternalLink from '../utilities/ExternalLink';
import './FooterLinks.css'

const FooterLinks = () => {
  const { t } = useTranslation();
  return (
    <ul>
      <li><ExternalLink to="#" label={t('hy_contact_info_link')} /></li>
      <li><ExternalLink to="#" label={t('hy_terms_of_use_link')} /></li>
      <li><ExternalLink to="#" label={t('hy_lataamo_instructions_link')} /></li>
      <li><ExternalLink to="#" label={t('hy_unitube_katsomo_link')} /></li>
      <li><ExternalLink to="#" label={t('hy_accessibility_statement')} /></li>
    </ul>
  );
};

FooterLinks.propTypes = {
};

export default FooterLinks;
