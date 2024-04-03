import { useState } from "react";
import { ProgressStatus } from "../../Constants";
import useMonitor from "../useMonitor";
import useUploadRecord from "../useUploadRecord";
import useSubtitleOrder from "./useSubtitleOrder";
import useSubtitleUpload from "./useSubtitleUpload";

const useNewRecordSave = () => {
  const [
    sendRecord, 
    recordUploadProgress, 
    resetRecordUploadProgress
  ] = useUploadRecord();
  const [startMonitoring, abortMonitoring] = useMonitor();
  const [uploadSubtitles, abortUploadingSubtitles] = useSubtitleUpload();
  const [progress, setProgress] = useState(null);

  const reset = () => {
    setProgress(null);
    resetRecordUploadProgress();
    abortMonitoring();
    abortUploadingSubtitles();
  };

  const save = async (record, subtitles) => {
    try {
      if (subtitles && subtitles.type === 'automaticSubtitles') {
        const eventId = await sendRecord({ 
          ...record, 
          translationModel: subtitles.translationModel,
          translationLanguage: subtitles.translationLanguage
        });
        setProgress({
          status: ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER,
          percentage: 100,
        });
        await startMonitoring({ id: eventId });
      } else if (subtitles && subtitles.type === 'subtitleFile') {
        const eventId = await sendRecord(record);
        setProgress({
          status: ProgressStatus.NEW_RECORD.SENDING_SUBTITLES,
          percentage: 100,
        });
        await uploadSubtitles({ file: subtitles.file, identifier: eventId });
      }
      setProgress({
        status: ProgressStatus.NEW_RECORD.DONE,
        percentage: 100,
      });
    } catch (error) {
      console.error(error.message);
      abortMonitoring();
      setProgress({
        status: ProgressStatus.NEW_RECORD.ERROR,
        percentage: 100,
        message: error.message,
      });
    }
  };

  return [save, progress || recordUploadProgress, reset];

};

export default useNewRecordSave;
