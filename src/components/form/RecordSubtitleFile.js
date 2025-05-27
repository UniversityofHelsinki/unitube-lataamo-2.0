import React, {useId, useRef} from 'react';
import PropTypes from 'prop-types';
import './RecordSubtitleFile.css';
import { useTranslation } from 'react-i18next';
import InputField from '../form/InputField';
import { ACCEPTED_VTT_MIME_TYPES } from '../../Constants';
import { ReactComponent as DeleteIcon } from '../../components/utilities/icons/trash.svg';
import HyButton from "../utilities/HyButton";

const RecordSubtitleFile = ({ videoFile, onDeleteSubtitleFile, recordSubtitleFileLanguage, onChange, message, disabled = false }) => {
    const { t } = useTranslation();
    const id = useId();

    const onAddRecordsubtitleFile = (file) => {
        onChange(file);
    }

    const fileInputRef = useRef();
    const onRemoveSubtitleFile = (event) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.setAttribute('type', '');
            fileInputRef.current.setAttribute('type', 'file');
        }
        onDeleteSubtitleFile(recordSubtitleFileLanguage);
    };

    return (
      <div className="record-subtitle-file">
              <label htmlFor={id} className="record-subtitle-file-language">{t('record_subtitle_' + recordSubtitleFileLanguage)} </label>
              <div className="record-subtitle-file-margin-block"></div>
              <div className="record-subtitle-file-input">
              <InputField
                className= {videoFile === null ? "record-subtitle-file-input-strike-through" : ""}
                aria-label={t('choose_file')}
                id={id}
                ref={fileInputRef}
                onChange={(e) => onAddRecordsubtitleFile(e.target.files[0])}
                type="file"
                message={message}
                accept={ACCEPTED_VTT_MIME_TYPES}
                disabled={disabled}
                aria-required
              />
              </div>
              <div className="record-subtitle-file-margin-block"></div>
              <HyButton
                  variant='danger'
                  onClick={(e) => onRemoveSubtitleFile(e)}
                  aria-label={t('record_subtitle_file_delete_aria')}
                  disabled={(videoFile == null) ? true : false} mini leftIcon={<DeleteIcon/>}
                  title={(videoFile == null) ? null : t('record_subtitle_file_delete_title')}>
                  <span>{t('record_subtitle_file_delete_aria')}</span>
              </HyButton>
      </div>
    );
};

RecordSubtitleFile.propTypes = {
    videoFile: PropTypes.object,
    onDeleteSubtitleFile: PropTypes.func.isRequired,
    recordSubtitleFileLanguage: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    disabled: PropTypes.bool
};

export default RecordSubtitleFile;
