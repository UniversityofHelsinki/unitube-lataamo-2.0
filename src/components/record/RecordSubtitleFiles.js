import PropTypes from 'prop-types';
import './RecordSubtitleFiles.css';
import { useTranslation } from 'react-i18next';
import RecordSubtitleFile from "../form/RecordSubtitleFile";
import HelpDialog from "../dialog/HelpDialog";

const RecordSubtitleFiles = ({ onChange, allFiles, message, disabled = false }) => {
    const { t } = useTranslation();

    const onChangeAllFiles =  (language, file) => {
        const current = {
            ...allFiles,
            [language]: file
        };
        onChange(current);
    };

    const messages = {
        finnish: message?.content?.video_text_track_file_finnish ? {
            content:  message.content.video_text_track_file_finnish,
            type: message.type
        } : '',
        swedish: message?.content?.video_text_track_file_swedish ? {
            content:  message.content.video_text_track_file_swedish,
            type: message.type
        } : '',
        english: message?.content?.video_text_track_file_english ? {
            content:  message.content.video_text_track_file_english,
            type: message.type
        } : ''
    };

    const messageMarginBlock = (show) => {
      if (show) {
        return <div className="record-subtitle-files-margin-block"></div>
      }
      return <></>;
    };

    return (
        <>
            <div className="record-subtitle-file-help">
                <HelpDialog label={t('record_subtitle_file_help_label')}>
                    {t('record_subtitle_file_help_content')}
                </HelpDialog>
            </div>
            <RecordSubtitleFile
                videoFile={allFiles?.video_text_track_file_finnish}
                onDeleteSubtitleFile={(file) => onChangeAllFiles('video_text_track_file_finnish', undefined)}
                recordSubtitleFileLanguage={'video_text_track_file_finnish'}
                onChange={(file) => onChangeAllFiles('video_text_track_file_finnish', file)}
                disabled={disabled}
                message={messages.finnish}
            />
            {messageMarginBlock(!messages.finnish)}
            <RecordSubtitleFile
                videoFile={allFiles?.video_text_track_file_swedish}
                onDeleteSubtitleFile={(file) => onChangeAllFiles('video_text_track_file_swedish', undefined)}
                recordSubtitleFileLanguage={'video_text_track_file_swedish'}
                onChange={(file) => onChangeAllFiles('video_text_track_file_swedish', file)}
                disabled={disabled}
                message={messages.swedish}
            />
            {messageMarginBlock(!messages.swedish)}
            <RecordSubtitleFile
                videoFile={allFiles?.video_text_track_file_english}
                onDeleteSubtitleFile={(file) => onChangeAllFiles('video_text_track_file_english', undefined)}
                recordSubtitleFileLanguage={'video_text_track_file_english'}
                onChange={(file) => onChangeAllFiles('video_text_track_file_english', file)}
                disabled={disabled}
                message={messages.english}
            />
            {messageMarginBlock(!messages.english)}
        </>
    );
};

RecordSubtitleFiles.propTypes = {
    onChange: PropTypes.func.isRequired,
    allFiles: PropTypes.object,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    disabled: PropTypes.bool
};

export default RecordSubtitleFiles;
