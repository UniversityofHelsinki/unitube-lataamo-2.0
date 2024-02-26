import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './VideoPreview.css';
import useVideos from '../../hooks/useVideos.js';
import {useTranslation} from "react-i18next";
import Loading from "../utilities/Loading";


const VideoPlayer = ({ video }) => {
    const { t } = useTranslation();
    const [currentVideo, setCurrentVideo] = useState(video);
    const [thumbnailUlr, setThumbnailUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [vttFile, setVTTFile] = useState('');

    useEffect(() => {
      setCurrentVideo(video);

        const fetchThumbnail = async (video) => {
            if (video?.coverImage) {
                const thumbnailUrl = `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/thumbnail/v1/${video.coverImage}`;
                try {
                    const response = await fetch(thumbnailUrl);
                    if (response.ok) {
                        const data = await response.blob();
                        setThumbnailUrl(URL.createObjectURL(data));
                    } else {
                        throw new Error('Failed to fetch thumbnail');
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };

        const playVideo = async (video) => {
            if (video?.url) {
                const videoUrl = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/` + video.url;
                try {
                    const response = await fetch(videoUrl);
                    if (response.ok) {
                        setVideoUrl(response.url);
                    } else {
                        throw new Error('Failed to fetch thumbnail');
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        };

        const getVTTFile = async (video) => {
            if (video?.vttFile && video.vttFile?.url) {
                const vttFileUrl = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + video.vttFile.url;
                try {
                    const response = await fetch(vttFileUrl);
                    if (response.ok) {
                        const data = await response.blob();
                        setVTTFile(URL.createObjectURL(data));
                    } else {
                        throw new Error('Failed to fetch vttFile');
                    }
                } catch (error) {
                    console.error('Fetch error:', error);
                }
            }
        }


      fetchThumbnail(video);
      playVideo(video);
      getVTTFile(video);
    }, [video])

    return (
        <Loading loading={!currentVideo || currentVideo.id !== video?.id}>
          <video data-testid="video-player" poster={thumbnailUlr} className="video-player" crossOrigin="anonymous" preload="metadata"
                 controlsList='nodownload' controls
                 onContextMenu={e => e.preventDefault()} src={videoUrl}>
              <track data-testid="caption-track"
                     src={vttFile} kind="captions"
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
    record: PropTypes.object.isRequired
};

export default VideoPreview;
