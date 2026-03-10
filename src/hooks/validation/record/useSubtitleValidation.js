import useValidation from "../useValidation";
import validateAutomaticSubtitles from "./automaticSubtitlesValidation";
import subtitleFileValidation from "./subtitleFileValidation";
import translationSubtitlesValidation from "./translationSubtitlesValidation";

const validationFunctions = {
  subtitleFile: subtitleFileValidation,
  automaticSubtitles: validateAutomaticSubtitles,
  translationSubtitles: translationSubtitlesValidation
};

const useSubtitleValidation = () => {
  const [isValid, messages, validate] = useValidation(
    validationFunctions, 
    ['automaticSubtitles', 'subtitleFile', 'translationSubtitles']
  );

  return [isValid, messages, validate];
};

export default useSubtitleValidation;
