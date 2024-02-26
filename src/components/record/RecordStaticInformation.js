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
    // const subtitles = videos?.map((video) => video.vttFile) || [];
    const subtitles = [{
        "id": "c42dbb0b-3b42-41a8-b912-ac051fe8aa52",
        "type": "text/vtt",
        "mimetype": "text/vtt",
        "tags": {
            "tag": "archive"
        },
        "url": "NDNjY2ViMmM2OGMzM2Y2NmE3MzQwODg5NTk3ZDYzMjNmNDAyYjRkZTAzNDhmYzMyZDk4OTMyOWY5NzhmOWZkNjgwNjkyYzk4NzMwNTBlNDUxMWM1ODU0MTVhMTljNTRhOWE5MWNhOGRmMDk5MjdlMDdmZGYyNGU1NGNmZjBhMjZjOGIwYzM5NTczZjQ5MGIyN2M1NTVhNjc0MWEwZDJkMzZmZDY0NDNkMjRiY2EyMDA0M2MxYTNmZmIyM2ZmZWFiZWQ5YjgwYTZlZDYxMmRjYjg3N2QyZmM2ZDMwNzIzN2M0MGE3OTU0MDEwNjlmMjM1MjcwNzIxYzZjNzc1ZmVhZjQ1ZjM5NDUzOGZhYThlMmZmYWM0YzViNGEzMWEyNDQzYzk3YWVkNTllZTM4MjM4ODllN2RmZGMzNjc1NTUxMTI=",
        "checksum": {
            "type": "md5",
            "$": "1119c82aa88d57d7ddd2e7aa804b25a5"
        },
        "track": "WEBVTT\n\n00:00:00.500 --> 00:00:02.000\nThe Web is always changing\n\n00:00:02.500 --> 00:00:04.300\nand the way we access it is changing\n",
        "filename": "sample.vtt"
    }];
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
