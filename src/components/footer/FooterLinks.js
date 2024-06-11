import React from 'react';
import {useTranslation} from 'react-i18next';
import ExternalLink from '../utilities/ExternalLink';
import './FooterLinks.css'
import Markdown from 'markdown-to-jsx'
import useReleaseNotes from "../../hooks/useReleaseNotes";
import ReleaseNotesDialog from "../dialog/ReleaseNotesDialog";
import i18n from "i18next";

const modifyDate = (releaseDate) => {
    const formattedDate = new Intl.DateTimeFormat(i18n.language, {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date(releaseDate));
    return formattedDate;
};

const FooterLinks = () => {
    const { t } = useTranslation();
    const releaseNotes = useReleaseNotes();
    const markdownNotes = releaseNotes.map((note, index) => (
        <div key={index}>
            <div className="header">
                <h4>{t('version_number')} {note.tag_name}</h4>
                <h4>{t('release_date')} {modifyDate(note.released_at)}</h4>
            </div>
            <div className="markdown-container">
                <Markdown>{note.description}</Markdown>
            </div>
        </div>
    ));
    return (
        <ul>
            <li><ExternalLink to="#" label={t('hy_contact_info_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_terms_of_use_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_lataamo_instructions_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_unitube_katsomo_link')} /></li>
            <li><ExternalLink to="#" label={t('hy_accessibility_statement')} /></li>
            <li><ReleaseNotesDialog label={t('release_notes_help_label')} releaseNotes={markdownNotes}></ReleaseNotesDialog></li>
        </ul>
    );
};

FooterLinks.propTypes = {
};

export default FooterLinks;
