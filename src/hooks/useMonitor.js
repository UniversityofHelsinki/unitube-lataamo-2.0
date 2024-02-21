import { MONITOR_POLLING_RATE_MS } from "../Constants";

const fetchStatus = async (job) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/monitor/${job}`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    throw new Error('monitor_error', {
      cause: error
    });
  }
};

const useMonitor = () => {

  const start = async (job) => {
    const thereIsAJob = (status) => 
      !["FINISHED", "NOT_FOUND"].includes(status);

    if (thereIsAJob(job.status)) {
      return await new Promise((resolve, reject) => {
        const monitor = () => {
          setTimeout(async () => {
            const current = await fetchStatus(job.id);
            if (thereIsAJob(current.status)) {
              monitor();
            } else {
              resolve(current);
            }
          }, MONITOR_POLLING_RATE_MS);
        };
        monitor();
      });
    }

  };

  return [start];

};

export default useMonitor;
