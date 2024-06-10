import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordLicense.css';
import FormElementHeader from '../form/FormElementHeader';
import { Col, Container, Form, Row } from 'react-bootstrap';
import DropDown from '../form/DropDown';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LICENSES } from '../../Constants.js';
import HelpDialog from "../dialog/HelpDialog";

const RecordLicense = ({ license, onChange, message, disabled = false }) => {
  const { t } = useTranslation();
  const id = useId();

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
          <FormElementHeader 
            componentId={id}
            helpDialog={(
              <HelpDialog label={t('record_license_help_label')} >
                {t('record_license_help_content')}
              </HelpDialog>
            )}
          >
            {t('record_license_header')}
          </FormElementHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <DropDown id={id} value={license} onChange={(e) => onChange(e.target.value)} options={licenses.map(asOption)} message={message} disabled={disabled} aria-required />
        </Col>
      </Row>
    </Container>
  );
};

RecordLicense.propTypes = {
  license: PropTypes.string.isRequired,
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default RecordLicense;
