import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import InputField from "../form/InputField";
import FormElementHeader from "../form/FormElementHeader";
import { Form } from 'react-bootstrap';
import PropTypes from "prop-types";
import './RecordName.css';
import { useId } from 'react';
import HelpDialog from "../dialog/HelpDialog";

const RecordName = ({ name, onChange, message, disabled = false }) => {
    const { t } = useTranslation();
    const id = useId();

    return (
        <Container>
            <Form.Group>
                <Row>
                    <Col>
                        <FormElementHeader componentId={id}>{t('record_form_name_header')}</FormElementHeader>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <HelpDialog  label={t('record_name_help_label')} >
                            {t('record_name_help_content')}
                        </HelpDialog>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField value={name} placeholder={t('record_form_name_placeholder')} onChange={(e) => onChange(e.target.value)} message={message} disabled={disabled} id={id} />
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

RecordName.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
  disabled: PropTypes.bool
};

export default RecordName;
