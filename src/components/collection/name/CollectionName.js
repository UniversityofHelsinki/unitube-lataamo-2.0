import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionName.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import InputField from "../../form/InputField";
import FormElementHeader from "../../form/FormElementHeader";
import HelpDialog from '../../dialog/HelpDialog';

const CollectionName = ({ name, onChange, message, disabled }) => {
    const { t } = useTranslation();
    const id = useId();

    const nameChanged = (event) => {
      onChange(event.target.value);
    };

    return (
        <Container className="ps-0">
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader componentId={id}>{t('collection_form_name_header')}</FormElementHeader> 
                    </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <HelpDialog label={t('collection_form_name_help_label')}>
                      {t('collection_form_name_help_content')}
                    </HelpDialog>
                  </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField id={id} label={name} placeholder={t('collection_form_name_placeholder')} value={name} onChange={nameChanged} message={message} disabled={disabled} />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

CollectionName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.object
};

export default CollectionName;
