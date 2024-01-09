import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ExternalLinkIcon } from './../utilities/icons/external-link.svg';
import Colors from './../utilities/HyColors';

const ExternalLink = ({ to, label }) => {
  return (
    <>
      <a href={to} style={{ paddingRight: '8px' }}>{label}</a>
      <ExternalLinkIcon height={12} width={12} fill={Colors.white} />
    </>
  );
};

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
