import React from 'react';
import PropTypes from 'prop-types';
import './RecordLicense.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Form, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LICENSES } from '../../Constants.js';

const RecordLicense = ({ license, onChange, message }) => {
  const { t } = useTranslation();

  const emptyLicense = '';

  const licenses = [
    emptyLicense,
    ...DEFAULT_LICENSES
  ];

  const asOption = (license) => {
    if (license) {
      return { value: license, label: t(license) };
    }
    return { value: '', label: t('record_license_default_select') };
  };


  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader>{t('record_license_header')}</FormElementHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <DropDown value={license} onChange={(e) => onChange(e.target.value)} options={licenses.map(asOption)} message={message} />
        </Col>
      </Row>
    </Container>
  );
};

RecordLicense.propTypes = {
  license: PropTypes.string.isRequired
};

export default RecordLicense;
