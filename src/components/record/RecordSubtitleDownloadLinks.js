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
const DownloadLink = ({ onChange, to, label, resetSubtitleDownloadLinks, disabled }) => {
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
            <div className="record-subtitle-download-link-remove-button">
                <RemoveSubtitleButton onClick={handleClick} markedForDeletion={markedForDeletion} disabled={disabled }/>
            </div>
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
    // Create the structure to hold the unique subtitles
    const uniqueIds = Array.from(new Set(subtitles.map(subtitle => subtitle.id)));
    return (
        <>
            {subtitles && subtitles.length > 0 && subtitles[0]?.filename !== 'empty.vtt' && (
                <Container>
                    <Row>
                        <Col>
                            <ElementHeader>
                                {t('record_subtitle_download_links_header')}
                            </ElementHeader>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                    </Row>
                    <Row>
                        <Col>
                            <ul className="blockquote record-subtitle-download-link-list">
                                {uniqueIds.map(uniqueId => {
                                    const subtitle = subtitles.find(sub => sub.id === uniqueId && sub.filename !== 'empty.vtt');

                                    // Return null if no subtitle was found with the unique id
                                    if (!subtitle) return null;

                                    return (
                                        <li key={subtitle.id}>
                                            <DownloadLink
                                                onChange={onChange}
                                                to={`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + subtitle.url}
                                                label={subtitle.filename}
                                                resetSubtitleDownloadLinks={resetSubtitleDownloadLinks}
                                                disabled={disabled}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
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
