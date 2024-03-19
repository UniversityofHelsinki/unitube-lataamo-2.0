import React from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import './RecordDownloadLinks.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import HelpDialog from '../dialog/HelpDialog';
import ElementHeader from '../form/ElementHeader';

const DownloadLink = ({ i, to, width, height, size, bitrate}) => {
  const resolution = `${width}x${height}`;
  const sizeMB = `${Math.ceil(size / 2**20)} MB`;
  const bitrateKbps = `${Math.ceil(size / 2**10)} kbps`;
  return (
    <>
      <DownloadIcon width="2em" height="2em" />
      <a download className="ms-2" href={to}>{i+1}. {resolution} - {sizeMB} - {bitrateKbps}</a>
    </>
  );
};

const RecordDownloadLinks = ({ downloadableMedia }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Row>
        <Col>
          <ElementHeader label={t('record_download_links_header')}>
            {t('record_download_links_header')}
          </ElementHeader>
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
            {Object.values(downloadableMedia).map((media, i) => (
              <li key={media.url || i}>
                <DownloadLink 
                  i={i}
                  to={media.url} 
                  width={media.width} 
                  height={media.height} 
                  size={media.size} 
                  bitrate={media.bitrate}
                />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

RecordDownloadLinks.propTypes = {
  downloadableMedia: PropTypes.object
};

export default RecordDownloadLinks;
