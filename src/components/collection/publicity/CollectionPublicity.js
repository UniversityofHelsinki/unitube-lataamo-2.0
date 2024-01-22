import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionPublicity.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import CheckBox from "../../form/CheckBox";
import FormElementHeader from "../../form/FormElementHeader";

const CollectionPublicity = ({ published }) => {
  const { t } = useTranslation();
  const [level, setLevel] = useState(published);

  const onChange = (what, checked) => {
  };

  return (
      <Container>
          <Form.Group>
              <Row>
                  <Col>
                      <FormElementHeader label={t('collection_form_publicity_header')} />
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <CheckBox
                          type="checkbox"
                          id="collection-publicity-shareable"
                          name="collection-publicity-shareable"
                          label={t('collection_publicity_shareable')}
                      />
                  </Col>
              </Row>
              <Row>
                  <Col>
                      <CheckBox
                          type="checkbox"
                          id="collection-publicity-public"
                          name="collection-publicity-public"
                          label={t('collection_publicity_public')}
                      />
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
