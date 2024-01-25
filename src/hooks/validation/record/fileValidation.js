import { MAX_FILE_SIZE_LIMIT, MIN_VIDEO_DURATION } from "../../../Constants";

const validateSize = (file) => {
  return file.size > MAX_FILE_SIZE_LIMIT;
};

const validateDuration = (videoFile) => {
  return videoFile.duration < MIN_VIDEO_DURATION;
};

const convert = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      resolve(video);
    };

    video.onerror = () => {
      resolve(false);
    };

    video.src = URL.createObjectURL(file);
  });
};

const validateFile = async (file, record) => {
  if (!file) {
    return 'record_file_validation_is_empty';
  }

  if (validateSize(file)) {
    return 'record_file_size_exceeded';
  }

  const video = await convert(file);
  if (!video) {
    return 'record_file_validation_invalid_file_format';
  }

  if (validateDuration(video)) {
    return 'record_file_validation_duration_too_short';
  }

  return false;
};

export default validateFile;
