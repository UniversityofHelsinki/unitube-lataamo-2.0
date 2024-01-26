import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './VideoPreview.css';

const PlaceholderBox = () =>
    (<div style={{ minWidth: '100px', minHeight: '100px' }} />);

const VideoPreview = ({ record }) => {
    return (
        <Container className="no-margin no-padding video-preview">
            <Row>
                <Col className="no-padding">
                    <PlaceholderBox />
                </Col>
            </Row>
        </Container>
    );
};

VideoPreview.propTypes = {
};

export default VideoPreview;
