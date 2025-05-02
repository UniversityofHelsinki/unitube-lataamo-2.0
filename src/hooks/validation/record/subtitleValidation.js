import { FIELD_IS_VALID } from "../../../Constants";
import validateAutomaticSubtitles from "./automaticSubtitlesValidation";
import validateSubtitleFile from "./subtitleFileValidation";


const validateSubtitles = (subtitles, _record) => {
  if (!subtitles) {
    return FIELD_IS_VALID;
  }

  if (subtitles.type === 'automaticSubtitles') {
    return validateAutomaticSubtitles(subtitles, _record);
  } else if (subtitles.type === 'subtitleFile') {
    return validateSubtitleFile(subtitles.allFiles, _record);
  }

};


export default validateSubtitles;
