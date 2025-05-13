import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import Loading from "../utilities/Loading";
import './VideoPreview.css';
import PropTypes from "prop-types";

const buildUrl = {
    video: (url) => `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/${url}`,
    vtt: (vttFile) => vttFile?.url ? `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/${vttFile.url}` : '',
    thumbnail: (coverImage) => `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/thumbnail/v1/${coverImage}`
};

const useLanguageDisplay = () => {
    const { i18n } = useTranslation();

    return (langCode) => {
        try {
            return new Intl.DisplayNames([i18n.language], { type: 'language' }).of(langCode);
        } catch (e) {
            console.warn(`Could not format language name for code: ${langCode}`, e);
            return langCode;
        }
    };
};

const processVTTFile = (vttFile) => {
    if (vttFile.filename === 'empty.vtt') return null;

    const tags = Array.isArray(vttFile.tags?.tag) ? vttFile.tags.tag : [];
    const langTag = tags.find(tag => tag.startsWith('lang:'));
    const language = langTag ? langTag.split(':')[1] : 'undefined';

    return {
        ...vttFile,
        language,
        isArchived: language === 'undefined'
    };
};

const createTrackElement = (vttFile, language, getLanguageDisplay, index) => (
    <track
        key={`track-${language}`}
        data-testid="caption-track"
        src={buildUrl.vtt(vttFile)}
        kind="captions"
        srcLang={vttFile.language}
        label={vttFile.isArchived ? "archived" : getLanguageDisplay(vttFile.language)}
        default={index === 0}
    />
);

const createVTTTracks = (vttFiles, getLanguageDisplay) => {
    if (!Array.isArray(vttFiles)) return [];

    const languageTracksMap = new Map();

    vttFiles.forEach(vttFile => {
        const processedVTT = processVTTFile(vttFile);
        if (processedVTT) {
            languageTracksMap.set(processedVTT.language, processedVTT);
        }
    });

    return Array.from(languageTracksMap.entries())
        .map(([language, vttFile], index) =>
            createTrackElement(vttFile, language, getLanguageDisplay, index)
        );
};

const useThumbnail = (video) => {
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    useEffect(() => {
        const fetchThumbnail = async () => {
            if (!video?.coverImage) return;

            try {
                const response = await fetch(buildUrl.thumbnail(video.coverImage));
                if (!response.ok) throw new Error('Failed to fetch thumbnail');
                const blob = await response.blob();
                setThumbnailUrl(URL.createObjectURL(blob));
            } catch (error) {
                console.error('Thumbnail fetch error:', error);
            }
        };

        fetchThumbnail();
    }, [video?.coverImage]);

    return thumbnailUrl;
};

const VideoPlayer = ({ video }) => {
    const thumbnailUrl = useThumbnail(video);
    const getLanguageDisplay = useLanguageDisplay();

    return (
        <Loading loading={!video}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                data-testid="video-player"
                poster={thumbnailUrl}
                className="video-player"
                crossOrigin="anonymous"
                preload="metadata"
                controlsList="nodownload"
                controls
                onContextMenu={e => e.preventDefault()}
            >
                <source data-testid="source" src={buildUrl.video(video?.url)} />
                {video?.vttFiles?.length > 0
                    ? createVTTTracks(video.vttFiles, getLanguageDisplay)
                    : ''
                }
            </video>
        </Loading>
    );
};

// PropTypes Definitions
const vttFileShape = PropTypes.shape({
    url: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    filename: PropTypes.string,  // Added missing filename validation
    tags: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            tag: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.arrayOf(PropTypes.string)
            ]),
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })
    ]),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    videoId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

const videoShape = {
    url: PropTypes.string.isRequired,  // Made url required
    coverImage: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    seriesId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    visibility: PropTypes.string,
    publishDate: PropTypes.string,
    archived: PropTypes.bool,
    type: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
    deleteKey: PropTypes.string,
    viewCount: PropTypes.number,
    vttFiles: PropTypes.arrayOf(vttFileShape).isRequired,  // Made vttFiles required
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        tag: PropTypes.string
    })),
    metadata: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        aspectRatio: PropTypes.string,
        bitrate: PropTypes.number,
        duration: PropTypes.number,
        format: PropTypes.string,
        fps: PropTypes.number
    })
};

VideoPlayer.propTypes = {
    video: PropTypes.shape(videoShape).isRequired
};

const VideoPreview = ({ video }) => video && <VideoPlayer video={video} />;


VideoPreview.propTypes = {
    video: PropTypes.shape(videoShape)  // Not required here since VideoPreview handles null/undefined
};

export default VideoPreview;
