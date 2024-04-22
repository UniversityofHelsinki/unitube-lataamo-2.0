import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Col, Container, Row} from 'react-bootstrap';
import './VideoPreview.css';
import {useTranslation} from "react-i18next";
import Loading from "../utilities/Loading";

const playVideo = (url) => {
    return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/` + url;
};

const getVTTFile = (vttFile) => {
    if (vttFile && vttFile.url) {
        return `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/` + vttFile.url;
    } else {
        return '';
    }
};

const VideoPlayer = ({ video }) => {
    const { t } = useTranslation();
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    useEffect(() => {

        const fetchThumbnail = async (video) => {
            if (video?.coverImage) {
                const thumbnailUrl = `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/thumbnail/v1/${video.coverImage}/160/160`;
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

        fetchThumbnail(video);
    }, [video])

    return (
        <Loading loading={!video}>
            <video 
                  data-testid="video-player" 
                  poster={thumbnailUrl} 
                  className="video-player" 
                  crossOrigin="anonymous" 
                  preload="metadata"
                  controlsList='nodownload' controls
                  onContextMenu={e => e.preventDefault()}
                >
                <source data-testid="source" src={playVideo(video?.url)} />
                <track data-testid="caption-track"
                       src={getVTTFile(video?.vttFile)} kind="captions"
                       srcLang="fi" label={t('subtitles_on')} default />
            </video>
        </Loading>
    );
};

const VideoPreview = ({ video }) => {
    return (
        video && <VideoPlayer video={video} />
    );
};

VideoPreview.propTypes = {
};

export default VideoPreview;
