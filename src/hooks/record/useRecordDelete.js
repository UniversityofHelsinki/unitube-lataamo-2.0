import { useState } from "react";
import { ProgressStatus } from "../../Constants";

const put = async (body, identifier) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/moveEventToTrash/${identifier}`;
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code ${response.status} from ${URL}.`);
  } catch (error) {
    console.error(error.message);
    throw new Error(`Error occurred for delete request for ${URL}`, {
      cause: error
    });
  }
};


const convertToBody = (record) => ({
  identifier: record.identifier,
  title: record.title,
  description: record.description,
  license: record.license
});

const useRecordDelete = () => {

  const defaultAnimatedPercentage = 100;
  const notStartedProgress = {
    status: ProgressStatus.RECORD_DELETE.NOT_STARTED,
    percentage: defaultAnimatedPercentage
  };
  const [progress, setProgress] = useState(notStartedProgress);

  const deleteRecord = async (record) => {
    setProgress({
      status: ProgressStatus.RECORD_DELETE.IN_PROGRESS,
      percentage: defaultAnimatedPercentage
    });
    try {
      console.log(record, convertToBody(record));
      await put(convertToBody(record), record.identifier);
      setProgress({
        status: ProgressStatus.RECORD_DELETE.DONE,
        percentage: 100
      });
    } catch (error) {
      console.error(error);
      setProgress({
        status: ProgressStatus.RECORD_DELETE.ERROR,
        percentage: 100,
        message: error.message
      });
    }
  };

  const resetProgress = () => setProgress(notStartedProgress);

  return [deleteRecord, progress, resetProgress];
  
};

export default useRecordDelete;
