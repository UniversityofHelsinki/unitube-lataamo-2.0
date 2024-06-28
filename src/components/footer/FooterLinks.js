import React from 'react';
import {useTranslation} from 'react-i18next';
import ExternalLink from '../utilities/ExternalLink';
import Feedback from './Feedback';
import './FooterLinks.css'
import ReleaseNotesDialog from "../dialog/ReleaseNotesDialog";

const FooterLinks = () => {
    const { t } = useTranslation();
    return (
        <ul>
            <li><ExternalLink to={t('footer_contact_info_link')} label={t('footer_contact_info_link_label')}/></li>
            <li><ExternalLink to={t('footer_terms_of_use_link')} label={t('footer_terms_of_use_link_label')}/></li>
            <li><ExternalLink to={t('footer_lataamo_instructions_link')} label={t('footer_lataamo_instructions_link_label')}/></li>
            <li><ExternalLink to={t('footer_unitube_katsomo_link')} label={t('footer_unitube_katsomo_link_label')}/></li>
            <li><ExternalLink to={t('footer_accessibility_statement_link')} label={t('footer_accessibility_statement_link_label')}/></li>
            <li><Feedback to="mailto:unitube-lataamo@helsinki.fi" label={t('footer_lataamo_feedback')}/></li>
            <li><ReleaseNotesDialog label={t('footer_release_notes_label')}/></li>
        </ul>
    );
};

FooterLinks.propTypes = {};

export default FooterLinks;
