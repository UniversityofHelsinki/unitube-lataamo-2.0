import { useState } from "react";
import { ProgressStatus } from "../../Constants";
import useRecordUpdate from "./useRecordUpdate";
import useSubtitleOrder from "./useSubtitleOrder";
import useSubtitleUpload from "./useSubtitleUpload";

const statuses = {
  'done': ProgressStatus.RECORD_SAVE.DONE
};

const useRecordSave = () => {
  const [updateRecord] = useRecordUpdate();
  const [uploadSubtitles] = useSubtitleUpload();
  const [orderSubtitles] = useSubtitleOrder();
  const [progress, setProgress] = useState({ 
    status: ProgressStatus.RECORD_SAVE.NOT_STARTED, 
    percentage: 0 
  });

  const reset = () => {
    setProgress({ status: ProgressStatus.RECORD_SAVE.NOT_STARTED, percentage: 0 });
  };

  const done = () => {
    setProgress({ status: ProgressStatus.RECORD_SAVE.DONE, percentage: 100 });
  };

  const saveFunctions = new Map();
  saveFunctions.set('record', updateRecord);
  saveFunctions.set('subtitles', uploadSubtitles);
  saveFunctions.set('orderSubtitles', orderSubtitles);
  saveFunctions.set('done', done);

  const save = async (inputs) => {
    let i = 0;
    const operationCount = 
      Object.values(inputs).filter(value => value).length;
    for (const [key, saveFn] of saveFunctions) {
      if (inputs[key] || key === 'done') {
        const status = statuses[key] || ProgressStatus.RECORD_SAVE[`IN_PROGRESS_${key.toUpperCase()}`];
        const currentProgress = {
          status,
          percentage: Math.ceil(i / operationCount * 100)
        };
        setProgress(currentProgress);
        try {
          await saveFn(inputs[key]);
        } catch (error) {
          setProgress({
            ...currentProgress,
            status: ProgressStatus.RECORD_SAVE.ERROR,
            message: error.message
          });
          return false;
        }
        i = i+1;
      }
    }
    return true;
  };

  return [progress, save, reset];

};

export default useRecordSave;
