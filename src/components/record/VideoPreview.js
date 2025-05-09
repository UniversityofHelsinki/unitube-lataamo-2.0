import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import Loading from "../utilities/Loading";
import './VideoPreview.css';
import PropTypes from "prop-types";

// Utils
const getPlayVideoUrl = (url) =>
    `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/video/play/${url}`;

const getVTTFileUrl = (vttFile) =>
    vttFile?.url ? `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/vttFile/${vttFile.url}` : '';

const getThumbnailUrl = (coverImage) =>
    `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/thumbnail/v1/${coverImage}`;

// Language handling
const useLanguageDisplay = () => {
    const { i18n } = useTranslation();

    return (langCode) => {
        try {
            const languageDisplay = new Intl.DisplayNames([i18n.language], { type: 'language' });
            return languageDisplay.of(langCode);
        } catch (e) {
            console.warn(`Could not format language name for code: ${langCode}`, e);
            return langCode;
        }
    };
};

// VTT tracks handling
const createVTTTracks = (vttFiles, getLanguageDisplay) => {
    if (!Array.isArray(vttFiles)) return [];
    const languageTracksMap = new Map();

    vttFiles?.forEach((vttFile) => {
        console.log('VTT File:', vttFile); // Debug log

        if (vttFile.filename === 'empty.vtt') {
            return;
        }

        // Handle archived VTT file
        if (vttFile.tags === "archive") {
            console.log('Archive file found'); // Debug log
            languageTracksMap.set('archived', {
                ...vttFile,
                language: 'en',
                isArchived: true
            });
            return;
        }

        // Handle regular VTT files
        const tags = Array.isArray(vttFile.tags?.tag) ? vttFile.tags.tag : [];
        const langTag = tags.find(tag => tag.startsWith('lang:'));
        const language = langTag ? langTag.split(':')[1] : 'fi';

        if (!languageTracksMap.has(language)) {
            languageTracksMap.set(language, {
                ...vttFile,
                language,
                isArchived: false
            });
        }
    });

    return Array.from(languageTracksMap.entries()).map(([language, vttFile], index) => {
        return (
            <track
                key={`track-${language}`}
                data-testid="caption-track"
                src={getVTTFileUrl(vttFile)}
                kind="captions"
                srcLang={vttFile.language}
                label={vttFile.isArchived ? "Archived" : getLanguageDisplay(vttFile.language)}
                default={index === 0}
            />
        );
    });
};



// Thumbnail handling
const useThumbnail = (video) => {
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    useEffect(() => {
        const fetchThumbnail = async () => {
            if (!video?.coverImage) return;

            try {
                const response = await fetch(getThumbnailUrl(video.coverImage));
                if (!response.ok) throw new Error('Failed to fetch thumbnail');

                const data = await response.blob();
                setThumbnailUrl(URL.createObjectURL(data));
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchThumbnail();
    }, [video?.coverImage]);

    return thumbnailUrl;
};

const VideoPlayer = ({ video }) => {
    const { t } = useTranslation();
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
                <source data-testid="source" src={getPlayVideoUrl(video?.url)} />
                {video?.vttFiles?.length > 0 ? (
                    createVTTTracks(video.vttFiles, getLanguageDisplay)
                ) : (
                    <track
                        data-testid="caption-track-empty"
                        kind="captions"
                        srcLang="fi"
                        label={t('no_captions_available')}
                        src="data:text/vtt,WEBVTT"
                    />
                )}
            </video>
        </Loading>
    );
};

const VideoPreview = ({ video }) => video && <VideoPlayer video={video} />;

const vttFileShape = PropTypes.shape({
    url: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
    url: PropTypes.string,
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
    vttFiles: PropTypes.arrayOf(vttFileShape),
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

export default VideoPreview;

