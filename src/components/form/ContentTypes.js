import React, { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import './ContentTypes.css'
import Loading from '../utilities/Loading';
import { Col, Container, Row } from 'react-bootstrap';
import FormElementHeader from './FormElementHeader';
import { useTranslation } from 'react-i18next';
import HelpDialog from '../dialog/HelpDialog';
import DropDown from './DropDown';

const fetchContentTypes = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/content-types`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code from ${URL}`, {
      cause: { status: response.status }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ContentTypes = ({ selected, onChange, disabled, message }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [contentTypes, setContentTypes] = useState(null);

  const id = useId();

  useEffect(() => {
    if (!contentTypes) {
      (async () => {
        setContentTypes(['', ...(await fetchContentTypes())])
        setLoading(false);
      })();
    }
  }, [loading, contentTypes]);

  return (
    <Loading loading={loading}>
      <Container className="content-types-container">
        <Row>
          <Col>
            <FormElementHeader id={id} helpDialog={
              <HelpDialog label={t('content_type_help_label')}>
                {t('content_type_help_content')}
              </HelpDialog>
            }>
              {t('content_type_header')}
            </FormElementHeader>
          </Col>
        </Row>
        <Row>
          <Col>
            <DropDown 
              aria-labelledby={id}
              options={contentTypes?.map(ct => ({ label: ct && t(`content_type_${ct.toLowerCase()}`) || t('content_type_option_default_select'), value: ct })) || []} 
              message={message} 
              value={selected}
              aria-required
              disabled={disabled}
              onChange={e => onChange(e.target.value)} />
          </Col>
        </Row>
      </Container>
    </Loading>
  );

};

ContentTypes.propTypes = {
};

export default ContentTypes;