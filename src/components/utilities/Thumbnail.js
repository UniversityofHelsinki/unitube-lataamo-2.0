import React, { useState, useEffect, useRef } from 'react';
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

const Thumbnail = ({ record, width, height, altText, containerRef }) => {
    const thumbnails = useSelector((state) =>
        state.thumbnails.urls
    );
    const dispatch = useDispatch();
    const ref = useRef(null);
    const { t } = useTranslation();

    const thumbnail = thumbnails[`${record.identifier}-${width}-${height}`];

    useEffect(() => {
        if (containerRef?.current && ref?.current && !thumbnail) {
          const options = {
            root: containerRef.current,
            rootMargin: '0px',
            threshold: 1.0
          };

          const intersectionObserver = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                intersectionObserver.disconnect();
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
            });
          }, options);

          intersectionObserver.observe(ref.current);
        }

    }, []);

    const label = t(altText, { title: record.title });

    if (thumbnail && URL.canParse(thumbnail)) {
        return (
            <img alt={label} title={label} src={thumbnail} aria-hidden />
        );
    }

    return <div ref={ref}></div>;
};

Thumbnail.propTypes = {
    record: PropTypes.object.isRequired
};

export default Thumbnail;
