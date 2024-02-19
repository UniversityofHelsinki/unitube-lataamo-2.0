import React from 'react';
import PropTypes from 'prop-types';
import './RecordSubtitle.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import Toggle from "../form/Toggle";
import RecordSubtitleFile from "../form/RecordSubtitleFile";
import RecordAutomaticSubtitleFile from "../form/RecordAutomaticSubtitleFile";
import ElementHeader from "../form/ElementHeader";
import HelpDialog from '../dialog/HelpDialog';


const RecordSubtitle = ({ onChange, message, file, automaticSubtitles, disabled }) => {
    const { t } = useTranslation();

    const handleChange = (what, value) => {
      if (what === 'subtitleFile') {
        onChange('subtitleFile', value);
      } else if (what === 'automaticSubtitles') {
        onChange('automaticSubtitles', value);
      }
    };

  console.log(message);

    return (
        <Container>
            <Form.Group>
                <Row className="record-subtitle-row mb-2">
                    <Col>
                        <ElementHeader label={t('record_subtitle_header')}> {t('record_subtitle_header')} </ElementHeader>
                    </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <HelpDialog label={t('record_subtitle_help_label')}>
                      {t('record_subtitle_help_content')}
                    </HelpDialog>
                  </Col>
                </Row>
                <Row>
                    <Col>
                        <Toggle labels={[t('record_subtitle_file_header'), t('record_automatic_subtitle_header')]}>
                            <RecordSubtitleFile onChange={(value) => handleChange('subtitleFile', value)} value={file} disabled={disabled} message={message.subtitleFile} />
                            <RecordAutomaticSubtitleFile onChange={(value) => handleChange('automaticSubtitles', value)} value={automaticSubtitles}  disabled={disabled} message={message.automaticSubtitles} />
                        </Toggle>
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

RecordSubtitle.propTypes = {
    onChange: PropTypes.func.isRequired,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    file: PropTypes.object,
    disabled: PropTypes.bool,
};

export default RecordSubtitle;
