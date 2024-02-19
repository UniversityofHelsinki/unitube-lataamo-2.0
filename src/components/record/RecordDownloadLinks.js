import React from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import './RecordDownloadLinks.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormElementHeader from '../form/FormElementHeader';
import HelpDialog from '../dialog/HelpDialog';

const DownloadLink = ({ to, label }) => {
  return (
    <>
      <DownloadIcon width="2em" height="2em" />
      <a className="ms-2" href={to}>{label}</a>
    </>
  );
};

const RecordDownloadLinks = ({ media, publications }) => {
  const { t } = useTranslation();
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
                <DownloadLink to={link.url} label={link.type} />
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
