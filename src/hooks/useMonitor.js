import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MONITOR_POLLING_RATE_MS } from "../Constants";

const fetchStatus = (job, setStatus) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/monitor/${job}`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      setStatus(await response.json());
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const useMonitor = () => {
  const [status, setStatus] = useState({});
  const intervalId = useRef();
  const dispatch = useDispatch();

  if (status.status === "FINISHED" || status.status === "NOT_FOUND") {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }

  const start = (job) => {
    setStatus({ jobId: job.id, status: job.status });
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    if (job.status !== "FINISHED") {
      intervalId.current = setInterval(() => {
        dispatch(fetchStatus(job.id, setStatus));
      }, MONITOR_POLLING_RATE_MS);
    }
  };

  return [status, start];

};

export default useMonitor;
