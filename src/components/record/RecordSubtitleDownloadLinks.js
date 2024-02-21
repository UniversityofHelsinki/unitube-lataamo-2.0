import React, {useState} from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import { ReactComponent as RemoveIcon } from '../utilities/icons/remove.svg';
import { ReactComponent as UndoIcon } from '../utilities/icons/rotate-left.svg';
import './RecordSubtitleDownloadLinks.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ElementHeader from "../form/ElementHeader";

const DownloadLink = ({ to, label }) => {
    const [markedForDeletion, setMarkedForDeletion] = useState(false);
    const linkClass = markedForDeletion ? "record-subtitle-download-link-deleted" : "record-subtitle-download-link";
    const handleClick = (markedForDeletion) => {
        setMarkedForDeletion(!markedForDeletion);
    };
    return (
        <div className="record-subtitle-download-link-item">
            <div className="record-subtitle-download-link-item-link">
                <DownloadIcon width="2em" height="2em" />
                <a title={label} className={`ms-2 ${linkClass}`} href={to}>{label}</a>
            </div>
            <div>
                <RemoveSubtitleButton onClick={() => handleClick(markedForDeletion)} markedForDeletion={markedForDeletion} />
            </div>
        </div>
    );
};

const RemoveSubtitleButton = ({ onClick, markedForDeletion }) => {
    const { t } = useTranslation();
    const label = markedForDeletion ? t('record_subtitle_undo_button') : t('record_subtitle_delete_button');
    const iconProps = {width: "2em", height: "1.2em"};
    const icon = markedForDeletion ? <UndoIcon {...iconProps} /> : <RemoveIcon {...iconProps} />;
    return (
        <Button className="remove-subtitle-button" onClick={onClick} variant="link">{icon}{label}</Button>
    );
};

const RecordSubtitleDownloadLinks = ({ subtitles }) => {
    const { t } = useTranslation();
    return (
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
                        {subtitles.map((subtitle, i) => (
                            <li key={subtitle.id || i}>
                                <DownloadLink to={`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + subtitle.url} label={subtitle.filename} />
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

RecordSubtitleDownloadLinks.propTypes = {
    subtitles: PropTypes.array
};

export default RecordSubtitleDownloadLinks;
