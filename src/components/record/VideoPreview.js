import React from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './VideoPreview.css';
import useVideos from '../../hooks/useVideos.js';

const playVideo = (url) => {
    return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/` + url;
};

const VideoPlayer = ({ video }) => {
    if (!video || !video.url) {
        // You can render a placeholder or loading state here
        return <div>Loading...</div>;
    }

    return (
            <video width="100%" height="300px" crossOrigin="anonymous" preload="metadata" controlsList='nodownload' controls
                    onContextMenu={e => e.preventDefault()} src={playVideo(video.url)}>
                <track kind="captions" src="" srcLang="en" label="English"/>
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
