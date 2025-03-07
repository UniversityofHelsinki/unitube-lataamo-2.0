import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionPublicity.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import { PUBLICITIES  } from '../../../Constants.js';
import RadioButtonGroup from '../../form/RadioButtonGroup';
import ElementHeader from '../../form/ElementHeader';
import HelpDialog from '../../dialog/HelpDialog';


const CollectionPublicity = ({ publicity, onChange, message, disabled }) => {
  const { t } = useTranslation();

  const changePublicity = (publicity) => {
    onChange(publicity);
  };

  return (
      <Container className="ps-0">
          <Form.Group>
              <Row>
                  <Col>
                      <ElementHeader 
                        label={t('collection_form_publicity_header')}
                        helpDialog={(
                          <HelpDialog label={t('collection_form_publicity_help_label')}>
                            {t('collection_form_publicity_help_content')}
                          </HelpDialog>
                        )}
                      >
                        {t('collection_form_publicity_header')}
                      </ElementHeader>
                  </Col>
              </Row>
              <Row>
                  <Col className="collection-publicity">
                    <RadioButtonGroup options={PUBLICITIES} value={publicity} onChange={changePublicity} disabled={disabled} aria-required />
                  </Col>
              </Row>
          </Form.Group>
      </Container>
  );
};

CollectionPublicity.propTypes = {
  published: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  message: PropTypes.object,
  disabled: PropTypes.bool
};

export default CollectionPublicity;
