import useMonitor from "../useMonitor";

const upload = async (data) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/videoTextTrack`;
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: data,
    });

    const body = await response.json();

    if (response.ok) {
      return body;
    } else if (response.status === 400) {
      throw new Error(body.message);
    }
  } catch (error) {
    console.error(error.message);
    throw new Error('error_subtitle_upload', {
      cause: error
    });
  }
};

const useSubtitleUpload = () => {
  const [startMonitoring, abortMonitoring] = useMonitor();

  const save = async (input) => {
    const formData = new FormData();
    if (input.video_text_track_file_finnish) formData.append('video_text_track_file_finnish', input.video_text_track_file_finnish);
    if (input.video_text_track_file_swedish) formData.append('video_text_track_file_swedish', input.video_text_track_file_swedish);
    if (input.video_text_track_file_english) formData.append('video_text_track_file_english', input.video_text_track_file_english);
    formData.append('eventId', input.identifier);
    const job = await upload(formData);

    if (job && job.status !== 'FINISHED' || job.status !== 'NOT_FOUND') {
      return async () => startMonitoring(job);
    }

    return async () => {};
  };

  return [save, abortMonitoring];
};

export default useSubtitleUpload;
