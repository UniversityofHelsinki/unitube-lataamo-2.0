import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordSpokenLanguage.css'
import { Col, Container, Form, Row } from 'react-bootstrap';
import FormElementHeader from '../form/FormElementHeader';
import HelpDialog from '../dialog/HelpDialog';
import { useTranslation } from 'react-i18next';
import RadioButtonGroup from '../form/RadioButtonGroup';

const languages = [
  {
    label: 'spoken_language_selection_fi',
    value: 'fi'
  },
  {
    label: 'spoken_language_selection_en',
    value: 'en'
  },
  {
    label: 'spoken_language_selection_sv',
    value: 'sv'
  }
];

const RecordSpokenLanguage = ({ language, onChange, disabled }) => {
  const { t } = useTranslation();
  const id = useId();

  const handleChange = (selected) => {
    onChange(selected);
  };

  return (
    <Container>
      <Form.Group>
        <Row>
          <Col>
            <FormElementHeader
              id={id}
              helpDialog={(
                <HelpDialog label={t('record_spoken_language_help_label')} >
                  {t('record_spoken_language_help_content')}
                </HelpDialog>
              )}
            >
              {t('record_form_spoken_language_header')}
            </FormElementHeader>
          </Col>
        </Row>
        <Row>
          <Col>
            <RadioButtonGroup 
              options={languages}
              value={language} 
              onChange={handleChange} 
              disabled={disabled} 
              aria-required 
            />
          </Col>
        </Row>
      </Form.Group>
    </Container>
  );

};

RecordSpokenLanguage.propTypes = {
  language: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
};

export default RecordSpokenLanguage;