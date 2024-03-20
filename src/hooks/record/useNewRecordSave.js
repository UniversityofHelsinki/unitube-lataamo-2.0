import { useState } from "react";
import { ProgressStatus } from "../../Constants";
import useUploadRecord from "../useUploadRecord";
import useSubtitleOrder from "./useSubtitleOrder";
import useSubtitleUpload from "./useSubtitleUpload";

const useNewRecordSave = () => {
  const [
    sendRecord, 
    recordUploadProgress, 
    resetRecordUploadProgress
  ] = useUploadRecord();
  const [orderSubtitles, abortOrderingSubtitles] = useSubtitleOrder();
  const [uploadSubtitles, abortUploadingSubtitles] = useSubtitleUpload();
  const [progress, setProgress] = useState(null);

  const reset = () => {
    setProgress(null);
    resetRecordUploadProgress();
    abortOrderingSubtitles();
    abortUploadingSubtitles();
  };

  const save = async (record, subtitles) => {
    try {
      const eventId = await sendRecord(record);
      if (subtitles) {
        if (subtitles.type === 'automaticSubtitles') {
          setProgress({
            status: ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER,
            percentage: 100
          });
          await orderSubtitles({ ...subtitles, identifier: eventId });
        } else if (subtitles.type === 'subtitleFile') {
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
      }
    } catch (error) {
      console.error(error.message);
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
