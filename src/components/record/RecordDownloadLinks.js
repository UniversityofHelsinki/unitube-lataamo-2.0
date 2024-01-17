import React from 'react';
import PropTypes from "prop-types";
import { ReactComponent as DownloadIcon } from '../utilities/icons/download.svg';
import './RecordDownloadLinks.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormElementHeader from '../form/FormElementHeader';

const DownloadLink = ({ to, label }) => {
  return (
    <>
      <DownloadIcon width="2em" height="2em" />
      <a className="ms-2" href={to}>{label}</a>
    </>
  );
};

const RecordDownloadLinks = ({ links }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader label={t('record_download_link_header')} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ul className="blockquote record-download-link-list">
            {links.map((link) => (
              <li key={link.to}>
              <DownloadLink to={link.to} label={link.label} />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

RecordDownloadLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default RecordDownloadLinks;
