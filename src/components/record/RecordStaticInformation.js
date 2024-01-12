import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import VideoPreview from "./VideoPreview";
import RecordIdentifier from "./RecordIdentifier";
import RecordLink from "./RecordLink";
import RecordEmbedCode from "./RecordEmbedCode";
import RecordDownLoadLinks from "./RecordDownloadLinks";

const RecordStaticInformation = () => {
  return (
    <Container>
      <Row>
        <Col>
            <VideoPreview record={null} />
        </Col>
      </Row>
      <Row>
        <Col>
            <RecordIdentifier />
        </Col>
      </Row>
      <Row>
        <Col>
            <RecordLink />
        </Col>
      </Row>
      <Row>
        <Col>
            <RecordEmbedCode />
        </Col>
      </Row>
      <Row>
        <Col>
            <RecordDownLoadLinks />
        </Col>
      </Row>
    </Container>
  );
};

RecordStaticInformation.propTypes = {
};

export default RecordStaticInformation;
