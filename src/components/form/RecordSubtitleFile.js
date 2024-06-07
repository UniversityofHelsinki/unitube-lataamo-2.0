import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordSubtitleFile.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import InputField from '../form/InputField';
import { ACCEPTED_VTT_MIME_TYPES } from '../../Constants';
import HelpDialog from "../dialog/HelpDialog";

const RecordSubtitleFile = ({ onChange, message, disabled = false }) => {
    const { t } = useTranslation();
    const id = useId();

    return (
        <Container className="px-0 mb-3">
            <Row className="mb-3">
                <Col>
                    <HelpDialog label={t('record_subtitle_file_help_label')} >
                        {t('record_subtitle_file_help_content')}
                    </HelpDialog>
                </Col>
            </Row>
            <Row>
                <Col>
                    <InputField 
                      aria-label={t('choose_file')} 
                      id={id} 
                      onChange={(e) => onChange(e.target.files[0])} 
                      type="file" 
                      message={message} 
                      accept={ACCEPTED_VTT_MIME_TYPES} 
                      disabled={disabled}
                      aria-required
                    />
                </Col>
            </Row>

        </Container>
    );
};

RecordSubtitleFile.propTypes = {
    onChange: PropTypes.func.isRequired,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    disabled: PropTypes.bool
};

export default RecordSubtitleFile;
