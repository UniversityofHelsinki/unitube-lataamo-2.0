import React from 'react';
import {useTranslation} from 'react-i18next';
import ExternalLink from '../utilities/ExternalLink';
import './FooterLinks.css'
import Markdown from 'markdown-to-jsx'
import useReleaseNotes from "../../hooks/useReleaseNotes";
import ReleaseNotesDialog from "../dialog/ReleaseNotesDialog";
import i18n from "i18next";

const FooterLinks = () => {
    const { t } = useTranslation();
    return (
        <ul>
            <li><ExternalLink to="#" label={t('hy_contact_info_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_terms_of_use_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_lataamo_instructions_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_unitube_katsomo_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_accessibility_statement')} /></li>
            <li><ReleaseNotesDialog label={t('release_notes_help_label')}></ReleaseNotesDialog></li>
        </ul>
    );
};

FooterLinks.propTypes = {
};

export default FooterLinks;
