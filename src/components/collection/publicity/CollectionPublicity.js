import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionPublicity.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import FormElementHeader from "../../form/FormElementHeader";
import { PUBLICITIES  } from '../../../Constants.js';
import RadioButtonGroup from '../../form/RadioButtonGroup';


const CollectionPublicity = ({ published }) => {
  const { t } = useTranslation();
  const [level, setLevel] = useState(published);
  const id = useId();

  const onChange = (what, checked) => {
    setLevel(checked);
  };

  return (
      <Container>
          <Form.Group>
              <Row>
                  <Col>
                      <FormElementHeader componentId={id}>{t('collection_form_publicity_header')}</FormElementHeader>
                  </Col>
              </Row>
              <Row>
                  <Col>
                    <RadioButtonGroup id={id} options={ PUBLICITIES } value={level} onChange={(value) => onChange('published', value)} />
                  </Col>
              </Row>
          </Form.Group>
      </Container>
  );
};

CollectionPublicity.propTypes = {
  published: PropTypes.string
};

export default CollectionPublicity;
