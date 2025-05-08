import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {ReactComponent as DownloadIcon} from '../utilities/icons/download.svg';
import {ReactComponent as RemoveIcon} from '../utilities/icons/remove.svg';
import {ReactComponent as UndoIcon} from '../utilities/icons/rotate-left.svg';
import './RecordSubtitleDownloadLinks.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import ElementHeader from "../form/ElementHeader";

/**
 * Functional component that represents a download link for a subtitle.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - Callback function to handle changes.
 * @param {String} props.to - The URL of the download link.
 * @param {String} props.label - The label of the download link.
 * @returns {JSX.Element} The download link component.
 */
const DownloadLink = ({ onChange, to, label, resetSubtitleDownloadLinks, disabled, isArchived }) => {
    const [markedForDeletion, setMarkedForDeletion] = useState(false);
    const linkClass = markedForDeletion ? "record-subtitle-download-link-deleted" : "record-subtitle-download-link";

    useEffect(() => {
        setMarkedForDeletion(false);
    }, [resetSubtitleDownloadLinks]);

    const handleClick = () => {
        const updatedMarkedForDeletion = !markedForDeletion;
        setMarkedForDeletion(updatedMarkedForDeletion);
        onChange('deleteSubtitle', updatedMarkedForDeletion || undefined);
    };

    return (
        <div className="record-subtitle-download-link-item">
            <div className="record-subtitle-download-link-item-link">
                <DownloadIcon width="2em" height="2em"/>
                <a title={label} className={`ms-2 ${linkClass}`} download href={to}>{label}</a>
            </div>
            {!isArchived && (
                <div className="record-subtitle-download-link-remove-button">
                    <RemoveSubtitleButton onClick={handleClick} markedForDeletion={markedForDeletion} disabled={disabled}/>
                </div>
            )}
        </div>
    );
};


/**
 * A button component used for removing subtitles.
 *
 * @component
 * @example
 * <RemoveSubtitleButton
 *    onClick={() => handleRemoveSubtitle()}
 *    markedForDeletion={true}
 * />
 *
 * @param {Function} onClick - The function to be called when the button is clicked.
 * @param {boolean} markedForDeletion - A flag indicating whether the subtitle is marked for deletion.
 * @returns {JSX.Element} The rendered RemoveSubtitleButton component.
 */
const RemoveSubtitleButton = ({ onClick, markedForDeletion, disabled }) => {
    const { t } = useTranslation();
    const label = markedForDeletion ? t('record_subtitle_undo_button') : t('record_subtitle_delete_button');
    const iconProps = {width: "2em", height: "1.2em"};
    const icon = markedForDeletion ? <UndoIcon {...iconProps} /> : <RemoveIcon {...iconProps} />;
    return (
        <Button className="remove-subtitle-button" onClick={onClick} variant="link" disabled={disabled}>{icon}{label}</Button>
    );
};

/**
 * Renders a list of subtitle download links for a record.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.subtitles - The list of subtitles to display.
 * @param {function} props.onChange - The onChange event handler.
 * @returns {JSX.Element|null} The subtitle download links component.
 */
const RecordSubtitleDownloadLinks = ({ subtitles, onChange, resetSubtitleDownloadLinks, disabled }) => {
    const { t } = useTranslation();

    const SUBTITLE_PRIORITIES = {
        FINNISH: 0,
        SWEDISH: 1,
        ENGLISH: 2,
        ARCHIVED: 3
    };

    const getLanguageFromTag = (langTag) => langTag?.split(':')[1];

    const getSubtitlePriority = (subtitle) => {
        const tags = Array.isArray(subtitle.tags?.tag)
            ? subtitle.tags.tag
            : [subtitle.tags?.tag];

        // Archived subtitles always come last
        if (tags.includes('archived')) {
            return SUBTITLE_PRIORITIES.ARCHIVED;
        }

        const languageTag = tags.find(tag => tag?.startsWith('lang:'));

        // Determine priority based on language
        const language = getLanguageFromTag(languageTag);
        switch (language) {
            case 'fin': return SUBTITLE_PRIORITIES.FINNISH;
            case 'swe': return SUBTITLE_PRIORITIES.SWEDISH;
            case 'eng': return SUBTITLE_PRIORITIES.ENGLISH;
        }
    };

    const compareSubtitles = (a, b) => getSubtitlePriority(a) - getSubtitlePriority(b);

    const flatSubtitles = subtitles?.[0]
            ?.filter(subtitle => subtitle && subtitle.filename !== 'empty.vtt')
            ?.sort(compareSubtitles)
        || [];




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
            <Row className="mb-3" />
            <Row>
                <Col>
                    <ul className="blockquote record-subtitle-download-link-list">
                        {flatSubtitles.map(subtitle => {
                            const language = (() => {
                                if (!subtitle.tags?.tag) return '';

                                // Handle both array and string cases
                                const tags = Array.isArray(subtitle.tags.tag)
                                    ? subtitle.tags.tag
                                    : [subtitle.tags.tag];

                                const langTag = tags.find(tag => tag?.startsWith('lang:'));
                                return langTag ? langTag.split(':')[1]?.toUpperCase() : tags[0];
                            })();


                            return (
                                <li key={subtitle.id}>
                                    <div className="d-flex align-items-center">
                                        <span className="me-2 badge bg-secondary">{language}</span>
                                        <DownloadLink
                                            onChange={onChange}
                                            to={`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + subtitle.url}
                                            label={subtitle.filename || subtitle.url.split('/').pop()}
                                            resetSubtitleDownloadLinks={resetSubtitleDownloadLinks}
                                            disabled={disabled}
                                            isArchived={subtitle.tags?.tag && (
                                                Array.isArray(subtitle.tags.tag)
                                                    ? subtitle.tags.tag.includes('archived')
                                                    : subtitle.tags.tag === 'archive'
                                            )}
                                        />

                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

/**
 * Validates the propTypes of the RecordSubtitleDownloadLinks component.
 *
 * @param {object} props - The props object containing the component's properties.
 */
RecordSubtitleDownloadLinks.propTypes = {
    subtitles: PropTypes.array,
    onChange: PropTypes.func,
    resetSubtitleDownloadLinks: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default RecordSubtitleDownloadLinks;
