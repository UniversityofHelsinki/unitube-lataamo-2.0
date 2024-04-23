import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const fetchThumbnail = async (record, width, height) => {
    if (record?.cover_image) {
        const thumbnailUrl = `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/thumbnail/v1/${record.cover_image}/${width}/${height}`;
        try {
            const response = await fetch(thumbnailUrl);
            if (response.ok) {
                const data = await response.blob();
                return URL.createObjectURL(data);
            } else {
                throw new Error('Failed to fetch thumbnail');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
};

const Thumbnail = ({ record, width, height, altText }) => {
    const thumbnails = useSelector((state) =>
        state.thumbnails.urls
    );
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const thumbnail = thumbnails[`${record.identifier}-${width}-${height}`];

    useEffect(() => {
        if (record.identifier && !thumbnail) {
            (async () => {
                dispatch({
                    type: 'SET_THUMBNAIL',
                    payload: {
                        identifier: `${record.identifier}-${width}-${height}`,
                        thumbnail: await fetchThumbnail(record, width, height) || {}
                    }
                });
            })();
        }
    }, []);

    const label = t(altText, { title: record.title });

    if (thumbnail && URL.canParse(thumbnail)) {
        return (
            <img alt={label} title={label} src={thumbnail} aria-hidden />
        );
    }

    return <></>;
};

Thumbnail.propTypes = {
    record: PropTypes.object.isRequired
};

export default Thumbnail;
