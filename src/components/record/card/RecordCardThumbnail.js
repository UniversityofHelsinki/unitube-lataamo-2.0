import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RecordCardThumbnail.css';
import { useTranslation } from 'react-i18next';

const RecordCardThumbnail = ({ record }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
      const fetchThumbnail = async () => {
          if (record?.cover_image) {
              const thumbnailUrl = `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/thumbnail/v1/${record.cover_image}`;
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

      fetchThumbnail();

      return () => {
          if (thumbnailUrl) {
                URL.revokeObjectURL(thumbnailUrl);
            }
        };
    }, [record]);

  const label = t('record_thumbnail_alt_text', { title: record.title });

  const thumbnail = thumbnailUrl ? <img alt={label} title={label} src={thumbnailUrl} /> : <div style={{ width: '160px', height: '160px' }} />;

    return (
      <div className="record-card-thumbnail">
        {thumbnail}
      </div>
    );
};

RecordCardThumbnail.propTypes = {
    record: PropTypes.object.isRequired
};

export default RecordCardThumbnail;
