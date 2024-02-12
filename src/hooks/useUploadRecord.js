import { useState } from "react";
import { useDispatch } from "react-redux";
import { ProgressStatus } from "../Constants";
import useMonitor from "./useMonitor";

const send = (record, setProgress) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userVideos`;
    const request = new XMLHttpRequest();
    request.timeout = 0;

    request.addEventListener('load', () => {
      resolve(JSON.parse(request.response));
    });

    request.upload.addEventListener('load', () => {
      const done = {
        percentage: 100,
        timeLeft: 0,
        status: ProgressStatus.DONE
      };
      setProgress(done);
    });

    const startTime = Date.now();
    let previousPercentage = 0;
    request.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const currentTime = Date.now();
        const percentage = Math.floor(event.loaded / event.total * 100);
        const progress = {
          percentage,
          timeLeft: Math.ceil((currentTime - startTime) / percentage * (100 - percentage) / 1000),
          status: ProgressStatus.SENDING
        };
        setProgress(progress);
        previousPercentage = percentage;
      }
    });

    const error = (event) => {
      console.error(event);
      const progress = {
        percentage: previousPercentage,
        status: ProgressStatus.ERROR
      };
      setProgress(progress);
    };

    request.addEventListener('error', error);
    request.addEventListener('timeout', error);

    request.open(
      'POST',
      URL
    );

    request.send(record);
  });
};

const monitorStatuses = {
  'FINISHED': ProgressStatus.DONE,
  'STARTED': ProgressStatus.PROCESSING,
  'NOT_FOUND': ProgressStatus.ERROR
};

const useUploadRecord = () => {
  const [progress, setProgress] = useState({
    status: ProgressStatus.NOT_STARTED,
    percentage: 0
  });
  const [startJob] = useMonitor();
  const dispatch = useDispatch();

  const sendRecord = async (record) => {
    const data = new FormData();
    Object.keys(record).forEach(key => {
      data.append(key, record[key]);
    });
    const job = await send(data, setProgress)(dispatch);
    setProgress({
      status: monitorStatuses[job.status],
      percentage: 100,
    });

    if (job && job.status !== 'FINISHED') {
      try {
        const jobResult = await startJob(job);
        setProgress({
          status: monitorStatuses[jobResult.status],
          percentage: 100
        });
      } catch (error) {
        setProgress({
          status: ProgressStatus.ERROR,
          percentage: 100,
          message: error.message
        });
      }
    }

  };

  const reset = () => setProgress({
    status: ProgressStatus.NOT_STARTED,
    percentage: 0
  });

  return [sendRecord, progress, reset];
};

export default useUploadRecord;
