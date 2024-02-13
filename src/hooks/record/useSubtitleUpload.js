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

  const save = async (input) => {
    console.log('tiedosto:', input.file);
    const formData = new FormData();
    formData.append('video_text_track_file', input.file);
    formData.append('eventId', input.identifier);
    await upload(formData);
  };

  return [save];
};

export default useSubtitleUpload;
