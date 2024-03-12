import { useState } from "react";
import { MONITOR_POLLING_RATE_MS } from "../Constants";

const fetchStatus = async (job) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/monitor/${job}`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code ${response.status} from ${URL}`);
  } catch (error) {
    console.error(error);
    throw new Error('monitor_error', {
      cause: error
    });
  }
};

const initialize = () => {
  let abortSignal = false;
  let aborted = false;
  const start = (job) => {
    const thereIsAJob = (status) => 
      !["FINISHED", "NOT_FOUND", "ERROR"].includes(status);

    const process = new Promise((resolve, reject) => {
      const monitor = () => {
        setTimeout(async () => {
          try {
            const current = await fetchStatus(job.id);
            
            if (thereIsAJob(current.status)) {
              if (!abortSignal) {
                monitor();
              }
            } else {
              resolve(current);
            }

          } catch (error) {
            console.error(error);
            reject(error);
          }
        }, MONITOR_POLLING_RATE_MS);
      };

      monitor();

    });
    return process;
  };

  const abortFn = () => { 
    abortSignal = true;
  };

  return [start, abortFn];
};

const useMonitor = () => {
  const [functions] = useState(initialize);
  return functions;
};

export default useMonitor;
