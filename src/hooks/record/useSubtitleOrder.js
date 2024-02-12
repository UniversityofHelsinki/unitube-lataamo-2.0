import useMonitor from "../useMonitor";

const order = async (body) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/generateAutomaticTranscriptionForVideo`;
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error.message);
    throw new Error('error_subtitle_order', {
      cause: error
    });
  }
};

const useSubtitleOrder = () => {
  const [startMonitoring] = useMonitor();

  const doOrder = async (input) => {
    const job = await order(input);
    if (job && job.status !== 'FINISHED') {
      await startMonitoring(job);
    }
  };

  return [doOrder];
};

export default useSubtitleOrder;
