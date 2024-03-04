import { useState } from "react";
import { ProgressStatus } from "../../Constants";

const put = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userVideos/${record.identifier}`
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(record)
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code ${response.status} while restoring record ${record.identifier}`);
  } catch (error) {
    console.error(error.message);
    throw new Error(`Error while restoring record`, {
      cause: error
    });
  }
};

const convertToBody = (record) => ({
  identifier: record.identifier,
  description: record.description,
  title: record.title,
  isPartOf: record.isPartOf,
  license: record.license
});

const useRecordRestore = () => {
  const defaultAnimatedPercentage = 100;
  const [progress, setProgress] = useState({
    status: ProgressStatus.RECORD_RESTORE.NOT_STARTED,
    percentage: defaultAnimatedPercentage
  });

  const restore = async (record) => {
    setProgress({
      status: ProgressStatus.RECORD_RESTORE.IN_PROGRESS,
      percentage: 100
    });
    try {
      await put(convertToBody(record));
      setProgress({
        status: ProgressStatus.RECORD_RESTORE.DONE,
        percentage: 100
      });
    } catch (error) {
      console.error(error);
      setProgress({
        status: ProgressStatus.RECORD_RESTORE.ERROR,
        percentage: 100,
        message: error.message
      });
    }
  };

  const resetProgress = () => {
    setProgress({
      status: ProgressStatus.RECORD_RESTORE.NOT_STARTED,
      percentage: defaultAnimatedPercentage
    });
  };


  return [restore, progress, resetProgress];
};

export default useRecordRestore;
