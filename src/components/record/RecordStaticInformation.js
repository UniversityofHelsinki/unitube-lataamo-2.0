import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './RecordStaticInformation.css';
import RecordEmbedCode from './RecordEmbedCode';
import RecordDownloadLinks from './RecordDownloadLinks';
import VideoPreview from './VideoPreview';
import RecordIdentifier from './RecordIdentifier';
import RecordLink from './RecordLink';
import RecordSubtitleDownloadLinks from "./RecordSubtitleDownloadLinks";
import useVideos from "../../hooks/useVideos";

const RecordStaticInformation = ({ record }) => {
    const videos = useVideos(record.identifier);
    const subtitles = videos?.map((video) => video.vttFile) || [];
    return (
    <Container className="ps-0">
      <Row className="mb-4">
        <Col>
            <VideoPreview videos={videos} record={record} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordIdentifier identifier={record.identifier} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordLink to="#" label={'https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D'}/>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordEmbedCode identifier={record.identifier} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordDownloadLinks media={record.media || []} publications={record.publications || {}} />
        </Col>
      </Row>
        <Row className="mb-4">
            <Col>
                <RecordSubtitleDownloadLinks media={record.media || []} subtitles={subtitles} />
            </Col>
        </Row>
    </Container>
  );
};

RecordStaticInformation.propTypes = {
  record: PropTypes.object,
};

export default RecordStaticInformation;
