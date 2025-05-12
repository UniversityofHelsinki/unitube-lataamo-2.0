import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import { ReactComponent as RemoveIcon } from '../utilities/icons/remove.svg';
import { ReactComponent as UndoIcon } from '../utilities/icons/rotate-left.svg';
import './RecordSubtitleDownloadLinks.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ElementHeader from "../form/ElementHeader";

const SUBTITLE_PRIORITIES = {
    FINNISH: 0,
    SWEDISH: 1,
    ENGLISH: 2,
    ARCHIVED: 3
};

const parseTags = (tags) => {
    if (!tags) return [];
    return Array.isArray(tags)
        ? tags
        : tags.split(',').map(tag => tag.trim());
};

const isArchivedOnly = (tags) => {
    const tagArray = parseTags(tags);
    return tagArray.length === 1 && tagArray[0] === 'archive';
};

const getLanguageFromTags = (tags) => {
    const tagArray = parseTags(tags);
    const langTag = tagArray.find(tag => tag?.startsWith('lang:'));
    if (!langTag) return '';

    const lang = langTag.split(':')[1];
    return lang?.toUpperCase() || '';
};

const DownloadLink = ({ onChange, to, label, resetSubtitleDownloadLinks, disabled, isArchived, language}) => {
    const [markedForDeletion, setMarkedForDeletion] = useState(false);
    const linkClass = markedForDeletion ? "record-subtitle-download-link-deleted" : "record-subtitle-download-link";

    useEffect(() => {
        setMarkedForDeletion(false);
    }, [resetSubtitleDownloadLinks]);

    const handleClick = () => {
        const updatedMarkedForDeletion = !markedForDeletion;
        setMarkedForDeletion(updatedMarkedForDeletion);
        onChange('deleteSubtitle', updatedMarkedForDeletion ? {
            language: `lang:${language.toLowerCase()}`
        } : null);

    };

    return (
        <div className="record-subtitle-download-link-item">
            <div className="record-subtitle-download-link-item-link">
                <DownloadIcon width="2em" height="2em"/>
                <a title={label} className={`ms-2 ${linkClass}`} download href={to}>{label}</a>
            </div>
            {!isArchived && (
                <div className="record-subtitle-download-link-remove-button">
                    <RemoveSubtitleButton
                        onClick={handleClick}
                        markedForDeletion={markedForDeletion}
                        disabled={disabled}
                    />
                </div>
            )}
        </div>
    );
};

const RemoveSubtitleButton = ({ onClick, markedForDeletion, disabled }) => {
    const { t } = useTranslation();
    const label = markedForDeletion ? t('record_subtitle_undo_button') : t('record_subtitle_delete_button');
    const iconProps = { width: "2em", height: "1.2em" };
    const icon = markedForDeletion ? <UndoIcon {...iconProps} /> : <RemoveIcon {...iconProps} />;

    return (
        <Button
            className="remove-subtitle-button"
            onClick={onClick}
            variant="link"
            disabled={disabled}
        >
            {icon}{label}
        </Button>
    );
};

const SubtitleItem = ({ subtitle, onChange, resetSubtitleDownloadLinks, disabled }) => {
    const language = getLanguageFromTags(subtitle.tags?.tag);
    const archived = isArchivedOnly(subtitle.tags?.tag);

    const { i18n } = useTranslation();

    const getLanguageNativeName = (code) => {
        if (!code) {
            return '';
        }

        if (!window.Intl || !Intl.DisplayNames) {
            return code.toUpperCase();
        }

        const languageNames = new Intl.DisplayNames([i18n.language], { type: 'language' });
        return languageNames.of(code.toLowerCase());
    };



    return (
        <li key={subtitle.id}>
            <div className="d-flex align-items-center">
                {!archived && language && (
                    <span className="card-tag badge bg-success">{getLanguageNativeName(language)}</span>
                )}
                <DownloadLink
                    onChange={onChange}
                    to={`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/${subtitle.url}`}
                    label={subtitle.filename || subtitle.url.split('/').pop()}
                    resetSubtitleDownloadLinks={resetSubtitleDownloadLinks}
                    disabled={disabled}
                    isArchived={archived}
                    language={language}
                />
            </div>
        </li>
    );
};

const RecordSubtitleDownloadLinks = ({ subtitles, onChange, resetSubtitleDownloadLinks, disabled }) => {
    const { t } = useTranslation();

    const getSubtitlePriority = (subtitle) => {
        if (isArchivedOnly(subtitle.tags?.tag)) {
            return SUBTITLE_PRIORITIES.ARCHIVED;
        }

        const language = getLanguageFromTags(subtitle.tags?.tag);
        switch (language) {
            case 'FIN': return SUBTITLE_PRIORITIES.FINNISH;
            case 'SWE': return SUBTITLE_PRIORITIES.SWEDISH;
            case 'ENG': return SUBTITLE_PRIORITIES.ENGLISH;
            default: return SUBTITLE_PRIORITIES.ARCHIVED;
        }
    };

    const flatSubtitles = subtitles
        ?.filter(subtitle => subtitle && subtitle.filename !== 'empty.vtt') || [];

    const archivedSubtitles = flatSubtitles.filter(subtitle => isArchivedOnly(subtitle.tags?.tag));
    const nonArchivedSubtitles = flatSubtitles
        .filter(subtitle => !isArchivedOnly(subtitle.tags?.tag))
        .sort((a, b) => getSubtitlePriority(a) - getSubtitlePriority(b));



    if (flatSubtitles.length === 0) {
        return null;
    }

    return (
        <Container>
            <Row>
                <Col>
                    <ElementHeader>
                        {t('record_subtitle_download_links_header')}
                    </ElementHeader>
                </Col>
            </Row>
            <Row/>
            <Row>
                <Col>
                    <ul className="blockquote record-subtitle-download-link-list">
                        {nonArchivedSubtitles.map(subtitle => (
                            <SubtitleItem
                                key={subtitle.id}
                                subtitle={subtitle}
                                onChange={onChange}
                                resetSubtitleDownloadLinks={resetSubtitleDownloadLinks}
                                disabled={disabled}
                            />
                        ))}
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ElementHeader>
                        {t('record_archived_subtitle_download_link_header')}
                    </ElementHeader>
                    <ul className="blockquote record-subtitle-download-link-list">
                        {archivedSubtitles.map((subtitle) => (
                            <SubtitleItem
                                key={subtitle.id}
                                subtitle={subtitle}
                                onChange={onChange}
                                resetSubtitleDownloadLinks={resetSubtitleDownloadLinks}
                                disabled={disabled}
                            />
                        ))}
                    </ul>
                </Col>
            </Row>

        </Container>
    );
};

RecordSubtitleDownloadLinks.propTypes = {
    subtitles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            filename: PropTypes.string,
            url: PropTypes.string,
            tags: PropTypes.shape({
                tag: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
            })
        })
    ),
    onChange: PropTypes.func.isRequired,
    resetSubtitleDownloadLinks: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};

SubtitleItem.propTypes = {
    subtitle: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        filename: PropTypes.string,
        url: PropTypes.string,
        tags: PropTypes.shape({
            tag: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
        })
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    resetSubtitleDownloadLinks: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};

DownloadLink.propTypes = {
    onChange: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    resetSubtitleDownloadLinks: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
    language: PropTypes.string.isRequired,
};

RemoveSubtitleButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    markedForDeletion: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default RecordSubtitleDownloadLinks;
