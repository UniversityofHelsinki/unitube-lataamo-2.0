import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ExternalLink from '../utilities/ExternalLink';
import './FooterLinks.css'

const FooterLinks = () => {
  const { t } = useTranslation();
  return (
      <ul>
          <li><ExternalLink to={t('footer_contact_info_link')} label={t('footer_contact_info_link_label')}/></li>
          <li><ExternalLink to={t('footer_terms_of_use_link')} label={t('footer_terms_of_use_link_label')}/></li>
          <li><ExternalLink to={t('footer_lataamo_instructions_link')} label={t('footer_lataamo_instructions_link_label')}/></li>
          <li><ExternalLink to={t('footer_unitube_katsomo_link')} label={t('footer_unitube_katsomo_link_label')}/></li>
          <li><ExternalLink to="#" label={t('footer_accessibility_statement_link_label')}/></li>
          <li><ExternalLink to="mailto:unitube-lataamo@helsinki.fi" label={t('footer_lataamo_feedback')}/></li>
      </ul>
  );
};

FooterLinks.propTypes = {};

export default FooterLinks;
