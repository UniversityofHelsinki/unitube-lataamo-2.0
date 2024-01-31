import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './VideoPreview.css';
import useVideos from '../../hooks/useVideos.js';
import {useTranslation} from "react-i18next";
import Loading from "../utilities/Loading";

const playVideo = (url) => {
    return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/` + url;
};

export const getVTTFile = (vttFile) => {
    if (vttFile && vttFile.url) {
        return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + vttFile.url;
    } else {
        return '';
    }
};

const VideoPlayer = ({ video }) => {
    const { t } = useTranslation();
    return (
        <Loading loading={!video} >
        <video data-testid="video-player" width="100%" maxLength="500px" crossOrigin="anonymous" preload="metadata"
               controlsList='nodownload' controls
               onContextMenu={e => e.preventDefault()}>
            <source data-testid="source" src={playVideo(video?.url)}/>
            <track data-testid="caption-track"
                   src={getVTTFile(video?.vttFile)} kind="captions"
                   srcLang="fi" label={t('subtitles_on')} default/>
        </video>
        </Loading>
    );
};

const VideoPreview = ({record}) => {
    const videos = useVideos(record.identifier);

    return (
        <Container className="no-margin no-padding">
            <Row>
            <Col className="no-padding">
                    <VideoPlayer video={videos[0]} />
                </Col>
            </Row>
        </Container>
    );
};

VideoPreview.propTypes = {
    record: PropTypes.object.isRequired, // Adjust the prop type based on your actual structure
};

export default VideoPreview;
