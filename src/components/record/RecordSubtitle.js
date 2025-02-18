import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RecordSubtitle.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import Toggle from "../form/Toggle";
import RecordSubtitleFile from "../form/RecordSubtitleFile";
import RecordAutomaticSubtitleFile from "../form/RecordAutomaticSubtitleFile";
import ElementHeader from "../form/ElementHeader";
import HelpDialog from '../dialog/HelpDialog';


const RecordSubtitle = ({ onChange, message, subtitles, disabled }) => {
    const { t } = useTranslation();
    const options = ['subtitleFile', 'automaticSubtitles'];
    const selected = options.indexOf(subtitles?.type);

    const onSelect = (index) => {
      if (selected === index) {
        onChange(undefined);
      } else {
        onChange({ type: options[index] });
      }
    };

    const getValue = (type) => {
      if (subtitles && subtitles.type === type) {
        return subtitles;
      }
      return undefined;
    };

    const subtitleFileMessages = typeof message?.content === 'string' ? message : undefined;
    const automaticFileMessages = typeof message?.content === 'object' ? message : undefined;


    return (
        <Container>
            <Form.Group>
                <Row className="record-subtitle-row mb-2">
                    <Col>
                        <ElementHeader 
                          label={t('record_subtitle_header')}
                          helpDialog={(
                            <HelpDialog label={t('record_subtitle_help_label')}>
                              {t('record_subtitle_help_content')}
                            </HelpDialog>
                          )}
                        >
                          {t('record_subtitle_header')}
                        </ElementHeader>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Toggle 
                          labels={[
                            t('record_subtitle_file_header'), 
                            t('record_automatic_subtitle_header')
                          ]}
                          onSelect={onSelect}
                          selected={selected}
                          disabled={disabled}>
                            <RecordSubtitleFile 
                              onChange={(file) => onChange({ type: 'subtitleFile', file })}
                              disabled={disabled} 
                              message={subtitleFileMessages} 
                            />
                            <RecordAutomaticSubtitleFile 
                              onChange={(value) => onChange({ type: 'automaticSubtitles', ...value })} 
                              value={getValue('automaticSubtitles')} 
                              disabled={disabled} 
                              message={automaticFileMessages} 
                            />
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
        content: PropTypes.any,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    file: PropTypes.object,
    disabled: PropTypes.bool,
};

export default RecordSubtitle;
