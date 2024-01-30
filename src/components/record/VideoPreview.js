import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './VideoPreview.css';
import useVideos from '../../hooks/useVideos.js';
import {useTranslation} from "react-i18next";

const playVideo = (url) => {
    return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/` + url;
};

export const getVTTFile = (url) => {
    return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + url;
};

const VideoPlayer = ({ video }) => {
    const { t } = useTranslation();
    if (!video || !video.url) {
        // You can render a placeholder or loading state here
        return <div>Loading...</div>;
    }

    return (
        <video data-testid="video-player" width="100%" maxLength="500px" crossOrigin="anonymous" preload="metadata"
               controlsList='nodownload' controls
               onContextMenu={e => e.preventDefault()}>
            <source src={playVideo(video.url)}/>
            <track data-test-id="caption-track"
                   src={video.vttFile && video.vttFile.url ? getVTTFile(video.vttFile.url) : ''} kind="captions"
                   srcLang="fi" label={t('subtitles_on')} default/>
        </video>
    );
};

const VideoPreview = ({record}) => {
    const video = useVideos(record.identifier);

    return (
        <Container className="no-margin no-padding">
            <Row>
            <Col className="no-padding">
                    <VideoPlayer video={video[0]} />
                </Col>
            </Row>
        </Container>
    );
};

VideoPreview.propTypes = {
    record: PropTypes.object.isRequired, // Adjust the prop type based on your actual structure
};

export default VideoPreview;
