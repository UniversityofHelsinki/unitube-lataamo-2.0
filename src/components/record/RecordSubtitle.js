import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RecordSubtitle.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import Toggle from "../form/Toggle";
import RecordAutomaticSubtitleFile from "../form/RecordAutomaticSubtitleFile";
import ElementHeader from "../form/ElementHeader";
import HelpDialog from '../dialog/HelpDialog';
import RecordSubtitleFiles from "./RecordSubtitleFiles";

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

    const automaticFileMessages = typeof message?.content === 'object' ? message : undefined;

    const allFiles = subtitles?.type === 'subtitleFile' ? {
        video_text_track_file_finnish: subtitles.allFiles?.video_text_track_file_finnish,
        video_text_track_file_swedish: subtitles.allFiles?.video_text_track_file_swedish,
        video_text_track_file_english: subtitles.allFiles?.video_text_track_file_english
    } : {
        video_text_track_file_finnish: undefined,
        video_text_track_file_swedish: undefined,
        video_text_track_file_english: undefined
    };

    const handleSubTitleFiles = (allFiles) => {
       if (allFiles?.video_text_track_file_finnish === undefined &&
           allFiles?.video_text_track_file_swedish === undefined &&
           allFiles?.video_text_track_file_english === undefined) {
           onChange({ type: 'subtitleFile' });
       } else {
           onChange({ type: 'subtitleFile', allFiles });
       }
    }

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
                            <RecordSubtitleFiles
                              allFiles={allFiles}
                              onChange={handleSubTitleFiles}
                              disabled={disabled} 
                              message={message}
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
