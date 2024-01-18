import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordEmbedCode from './RecordEmbedCode';
import RecordDownLoadLinks from './RecordDownloadLinks';
import VideoPreview from './VideoPreview';
import RecordIdentifier from './RecordIdentifier';
import RecordLink from './RecordLink';
import './RecordStaticInformation.css';

const RecordStaticInformation = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
            <VideoPreview record={null} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordIdentifier id={'45ce69e0-1793-4494-8674-fff6d48f4a2f'} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordLink to="#" label={'https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D'}/>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordEmbedCode content={'<iframe src="https://unitube.it.helsinki.fi/unitube/embed.html?id=45ce69e0-1793-4494-8674-fff6d48f4a2f" scrolling="no" allowfullscreen="true" frameBorder="0" marginHeight="0px" marginWidth="0px" height="360" width="640"></iframe>dsajflfhljskfasfklafhlsadfhaklsfhaslkdjhaslkdjfhs lkashdf jklsadhflash dflasdfh sakldfjhsklfdjsahf dlkasdfh'}/>

        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
            <RecordDownLoadLinks links={[ { to: 'adsf', label: '1923 kpbs - 32mb'}, { to: 'asfdsfasdf', label: '12923 kbps - 720p - 231 MB'}]}/>
        </Col>
      </Row>
    </Container>
  );
};

RecordStaticInformation.propTypes = {
};

export default RecordStaticInformation;
