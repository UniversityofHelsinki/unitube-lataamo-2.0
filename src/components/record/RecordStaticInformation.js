import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordEmbedCode from "./RecordEmbedCode";
import RecordDownLoadLinks from "./RecordDownloadLinks";
import './RecordStaticInformation.css'
import VideoPreview from "./VideoPreview";
import RecordIdentifier from "./RecordIdentifier";
import RecordLink from "./RecordLink";


const RecordStaticInformation = () => {
  return (
    <Container>
      <Row className="row-element">
        <Col>
            <VideoPreview record={null} />
        </Col>
      </Row>
      <Row className="row-element">
        <Col>
            <RecordIdentifier />
        </Col>
      </Row>
      <Row className="row-element">
        <Col>
            <RecordLink to="#" linklabel={'https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D'}/>
        </Col>
      </Row>
      <Row className="row-element">
        <Col>
            <RecordEmbedCode />
        </Col>
      </Row>
      <Row className="row-element">
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
