import React from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import './RecordDownloadLinks.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormElementHeader from '../form/FormElementHeader';
import HelpDialog from '../dialog/HelpDialog';

const DownloadLink = ({ to, label, resolution, bitrate, size }) => {
  return (
    <>
      <DownloadIcon width="2em" height="2em" />
      <a download className="ms-2" href={to}>{resolution} - {bitrate} - {size}</a>
    </>
  );
};

const getResolution = (mediaFileMetadata) => {
    return mediaFileMetadata?.streams?.video[0]?.resolution;
}
const getBitrate = (mediaFileMetadata) => {
    return Math.ceil( ((mediaFileMetadata?.size / 1000) * 8) / (mediaFileMetadata?.duration / 1000) ) + ` kbps`;
}
const getSize = (mediaFileMetadata) => {
    return Math.ceil( mediaFileMetadata?.size / 1000000) + ` MB`;
}

const RecordDownloadLinks = ({ media, publications, mediaFileMetadata }) => {
  const { t } = useTranslation();
  const resolution = getResolution(mediaFileMetadata);
  const bitrate = getBitrate(mediaFileMetadata);
  const size = getSize(mediaFileMetadata);

  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader>
            {t('record_download_links_header')}
          </FormElementHeader>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <HelpDialog label={t('record_download_links_help_label')}>
            {t('record_download_links_help_content')}
          </HelpDialog>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="blockquote record-download-link-list">
            {media.map((link, i) => (
              <li key={link.to || i}>
                <DownloadLink to={`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/download/${link.url}`} label={link.type} resolution={resolution} bitrate={bitrate} size={size} />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

RecordDownloadLinks.propTypes = {
  media: PropTypes.array,
  publications: PropTypes.object,
};

export default RecordDownloadLinks;
