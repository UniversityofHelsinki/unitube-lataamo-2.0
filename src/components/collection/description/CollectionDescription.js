import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionDescription.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import TextArea from "../../form/TextArea";
import FormElementHeader from "../../form/FormElementHeader";
import HelpDialog from '../../dialog/HelpDialog';

const CollectionDescription = ({ description, onChange, message, disabled }) => {
    const { t } = useTranslation();
    const id = useId();
    
    const changeDescription = (event) => {
      onChange(event.target.value);
    };

    return (
        <Container className="ps-0">
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader 
                          id={id}
                          helpDialog={(
                            <HelpDialog label={t('collection_form_description_help_label')}>
                              {t('collection_form_description_help_content')}
                            </HelpDialog>
                          )}
                        >
                          {t('collection_form_description_header')}
                        </FormElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextArea aria-labelledby={id} value={description} onChange={changeDescription} message={message} disabled={disabled} aria-required />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

CollectionDescription.propTypes = {
  description: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.object,
  disabled: PropTypes.bool
};

export default CollectionDescription;
