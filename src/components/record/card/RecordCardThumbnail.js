import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './RecordCardThumbnail.css';

const RecordCardThumbnail = ({ record }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(null);

    useEffect(() => {
        const fetchThumbnail = async () => {
            if (record?.cover_image) {
                const thumbnailUrl = `${process.env.REACT_APP_LATAAMO_THUMBNAIL_SERVER}/api/v1/thumbnail?url=${encodeURIComponent(record.cover_image)}`;
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

    return (
        <Container className="no-margin record-card-thumbnail">
            <Row>
                <Col className="no-padding">
                    {thumbnailUrl ? (
                        <img alt="coverImage" src={thumbnailUrl} />
                    ) : (
                        <div style={{ minWidth: '160px', minHeight: '160px' }} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

RecordCardThumbnail.propTypes = {
    record: PropTypes.object.isRequired
};

export default RecordCardThumbnail;
